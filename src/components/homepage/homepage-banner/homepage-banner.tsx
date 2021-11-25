import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';

const HomepageBanner = () => {
  return (
    <FlexContainer className="h-screen justify-center items-center flex-wrap">
      <FlexItem className="text-center w-full md:w-1/2">
        <h1 data-cy="homepage-banner-title">Rob Bailey</h1>
        <h2 className="text-accent" data-cy="homepage-banner-subtitle">
          Software Engineer
        </h2>
      </FlexItem>
      <FlexItem className="text-center w-full md:w-1/2">
        <p>Hi there!</p>
        <p>I make things with code.</p>
      </FlexItem>
    </FlexContainer>
  );
};

export default HomepageBanner;
