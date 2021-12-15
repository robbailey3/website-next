import spotifyAuthService from './spotify-auth.service';

declare var window: any;

class SpotifyPlayer {
  private scriptEl!: HTMLScriptElement;

  private player!: Spotify.Player;

  public injectScript() {
    if (!this.scriptEl) {
      this.scriptEl = document.createElement('script');
      this.scriptEl.src = 'https://sdk.scdn.co/spotify-player.js';
      document.head.appendChild(this.scriptEl);
      this.scriptEl.onload = () => this.handleScriptLoad();
    }
  }

  private async handleScriptLoad() {
    (window as any).onSpotifyWebPlaybackSDKReady = async () => {
      await this.createPlayer();
      this.setupEventHandlers();
    };
  }

  private async createPlayer(): Promise<void> {
    this.player = new Spotify.Player({
      name: 'Spotify Player',
      getOAuthToken: (cb: any) => {
        const accessToken = spotifyAuthService.getAccessToken();
        cb(accessToken);
      },
    });
    this.player.connect();
    console.log(this);
  }

  private setupEventHandlers(): void {
    this.player.addListener('ready', (args) => {
      console.log('Ready with Device ID', args.device_id);
    });
  }
}

export default new SpotifyPlayer();
