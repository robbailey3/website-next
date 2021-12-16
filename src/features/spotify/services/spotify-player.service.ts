import { ReplaySubject, Subject } from 'rxjs';
import spotifyAuthService from './spotify-auth.service';

declare var window: any;

class SpotifyPlayer {
  public deviceId: string | null = null;

  public ready: boolean = false;

  public $playerReady: Subject<boolean> = new ReplaySubject();

  public $playerState: Subject<Spotify.PlaybackState> = new Subject();

  private scriptEl!: HTMLScriptElement;

  private player!: Spotify.Player;

  constructor() {}

  public async init() {
    await this.handleScriptLoad();
    if (!this.scriptEl) {
      this.scriptEl = document.createElement('script');
      this.scriptEl.src = 'https://sdk.scdn.co/spotify-player.js';
      document.head.appendChild(this.scriptEl);
    }
  }

  private async handleScriptLoad() {
    if (typeof window !== 'undefined') {
      window.onSpotifyWebPlaybackSDKReady = async () => {
        console.log('Spotify SDK Ready');
        this.createPlayer();
        this.setupEventHandlers();
        await this.connect();
      };
    }
  }

  private createPlayer(): void {
    this.player = new Spotify.Player({
      name: 'Spotify Player',
      getOAuthToken: (cb: any) => {
        const accessToken = spotifyAuthService.getAccessToken();
        cb(accessToken);
      },
    });
  }

  public async connect(): Promise<void> {
    const success = this.player.connect();
    if (!success) {
      throw new Error('Could not connect to Spotify');
    }
  }

  private setupEventHandlers(): void {
    this.player.addListener('ready', (args) => {
      this.deviceId = args.device_id;
      this.ready = true;
      this.$playerReady.next(this.ready);
    });
    this.player.addListener('not_ready', (args) => {
      this.ready = false;
      this.$playerReady.next(this.ready);
    });
    this.player.addListener('player_state_changed', (state) => {
      this.$playerState.next(state);
    });
  }

  public togglePlay(): Promise<void> {
    return this.player.togglePlay();
  }

  public nextTrack(): Promise<void> {
    return this.player.nextTrack();
  }

  public previousTrack(): Promise<void> {
    return this.player.previousTrack();
  }
}

export default new SpotifyPlayer();
