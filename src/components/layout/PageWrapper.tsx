import { useMemo } from 'react';
import { Navbar } from './Navbar';
import { PageContainer } from './PageContainer';

type PageWrapperProps = {
  children: JSX.Element | JSX.Element[];
  backgroundImageUrl?: string;
};

export const PageWrapper = ({
  children,
  backgroundImageUrl,
}: PageWrapperProps) => {
  const topPageBackground = useMemo(
    () =>
      backgroundImageUrl ? (
        <div className="page-background__image">
      {backgroundImageUrl && <div className="page-background__image__shade" />}
          <img src={backgroundImageUrl} alt="page-background" />
          <div className="page-background__image__bottom-shade" />
        </div>
      ) : (
        <div className="page-background__shape" />
      ),
    [backgroundImageUrl]
  );

  return (
    <div className="page-background">
      <div className="page-background__top-page-background">
        {topPageBackground}
      </div>

      {/* {backgroundImageUrl && <div className="page-background__image__shade" />} */}

      <Navbar />

      <PageContainer>{children}</PageContainer>
    </div>
  );
};
