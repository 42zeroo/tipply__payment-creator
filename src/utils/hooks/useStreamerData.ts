import { useCallback, useEffect, useState } from 'react';
import { StreamerDataAPI } from 'src/utils/services/StreamerDataAPI';
import { StreamerProfile } from '../entity/StreamerProfile';
import { isString } from 'lodash';

export const useStreamerData = (init = true) => {
  const [streamerName] = useState(
    window.location.pathname.split('/')[
      window.location.pathname.lastIndexOf('/') + 1
    ]
  );
  const [streamerProfileData, setStreamerProfileData] =
    useState<StreamerProfile | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const getStreamerProfileData = useCallback(async () => {
    const fetchedStreamerProfileData = await StreamerDataAPI.getStreamerProfile(
      streamerName
    );

    if (!fetchedStreamerProfileData) {
      throw new Error('Cannot fetch streamer profile data from API!');
    }

    setStreamerProfileData(fetchedStreamerProfileData);
    setIsDataLoading(false);
  }, [streamerName]);

  useEffect(() => {
    if (init) {
      getStreamerProfileData();
    }
  }, [getStreamerProfileData, init]);

  useEffect(() => {
    document
      ?.getElementById('root')
      ?.style.setProperty(
        '--user-color',
        !streamerProfileData?.userColor
          ? 'rgb(43,210,131)'
          : `rgb(${streamerProfileData.userColor.r}, ${streamerProfileData.userColor.g}, ${streamerProfileData.userColor.b})`
      );
    document
      ?.getElementById('root')
      ?.style.setProperty(
        '--r',
        !streamerProfileData?.userColor
          ? '43'
          : `${streamerProfileData.userColor.r}`
      );
    document
      ?.getElementById('root')
      ?.style.setProperty(
        '--g',
        !streamerProfileData?.userColor
          ? '210'
          : `${streamerProfileData.userColor.g}`
      );
    document
      ?.getElementById('root')
      ?.style.setProperty(
        '--b',
        !streamerProfileData?.userColor
          ? '131'
          : `${streamerProfileData.userColor.b}`
      );
  }, [streamerProfileData?.userColor]);

  return {
    streamerProfileData,
    isDataLoading,
  };
};
