import { StreamerProfile } from 'src/utils/entity/StreamerProfile';
import { sleep } from 'src/utils/helpers/sleep';
import { MOCK_STREAMER_TIPS } from 'src/../__MOCK__/services/streamer-data-api/mock-streamer-nicknames';
import sampleSize from 'lodash/sampleSize';
import map from 'lodash/map';
import sumBy from 'lodash/sumBy';
import filter from 'lodash/filter';
import { orderBy, sortBy } from 'lodash';

export interface StreamerTip {
  nickname: string;
  tip: number;
  date: number;
}

export interface BestTipper {
  nickname: string;
  sumOfTips: number;
}

export type BestTiperTimeRange = 'today' | 'week' | 'month';

const ZAIROX_DATA = {
  name: 'ZairoxTV',
  description:
    'Siema jestem Marek mam 19 lat i prowdzę dla Was transmisje na żywo na których kocham grać w Fortnite, Minecraft, i w ogóle mega gry takie fajne zarąbistge ale nie mówcie o tym nikomu okok',
  avatarUrl:
    'https://lh3.googleusercontent.com/a-/AOh14Gi8NKAj067mF0hQltzk3-StFiEBO16W9U2UuDCuwQ=s96-c',
  backgroundImageUrl:
    'https://gaming.komputronik.pl/wp-content/uploads/2022/12/kody-do-star-stable.jpg',
  // backgroundImageUrl: 'https://i.ibb.co/Wpfmb35/image-1.png',
  // backgroundImageUrl: 'https://i.ibb.co/F3yRzbn/xd.png',
  isVerified: true,
  socials: {
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    tikTok: 'https://tiktok.com',
  },
  predefinedPrices: [4.2, 6.9, 10, 21.37, 30],
  whereTipsGoes: [
    {
      name: 'NA NOWY KOMPUTER',
      limit: 5000,
      actualTipValue: 2500.22,
    },
    {
      name: 'KIBEL NA KTÓRY DZISIAJ NASRAŁEM MEGAKOX I W OGÓLE KOZAK',
      limit: 500,
      actualTipValue: 50,
    },
    {
      name: 'KIBEL',
      limit: 200,
      actualTipValue: 0,
    },
    {
      name: 'FON  🥺',
      limit: 1000,
      actualTipValue: 1000,
    },
  ],
  hasTips: true,
  allowRecord: true,
};

const TESTER_DATA = {
  userColor: { r: 40, g: 155, b: 255 },
  name: 'Tester',
  description: 'Siema jestem Tester mam 12 lat.',
  avatarUrl: 'https://i.ibb.co/F3yRzbn/xd.png',
  backgroundImageUrl:
    'https://gaming.komputronik.pl/wp-content/uploads/2022/12/kody-do-star-stable.jpg',
  isVerified: false,
  socials: {
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com',
    tikTok: 'https://tiktok.com',
  },
  predefinedPrices: [6.9, 10, 21.37, 30],
  whereTipsGoes: [
    {
      name: 'KIBEL NA KTÓRY DZISIAJ NASRAŁEM MEGAKOX I W OGÓLE KOZAK',
      limit: 500,
      actualTipValue: 50,
    },
    {
      name: 'KIBEL',
      limit: 200,
      actualTipValue: 0,
    },
  ],
  hasTips: true,
};

const MICHAL_DATA = {
  userColor: { r: 251, g: 206, b: 177 },
  name: 'Michał Włodarczyk',
  description: 'Siema jestem Michal Włodarczyk i jestem z Łodzi.',
  avatarUrl:
    'https://i1.jbzd.com.pl/contents/2023/06/normal/lmmtbze0DqvtULjdb2tMpgmOPDWLG4bf.jpg',
  backgroundImageUrl:
    'https://i1.jbzd.com.pl/contents/2023/06/normal/nWzFXh5QsijuaINsxcqOJNpli1jwgt5O.jpg',
  isVerified: true,
  socials: {
    tikTok: 'https://tiktok.com',
  },
};

export class StreamerDataAPI {
  private static mockRecords = sampleSize(MOCK_STREAMER_TIPS, 10);

  public static async getStreamerProfile(
    profileName: string
  ): Promise<StreamerProfile> {
    await sleep(1000);

    return ZAIROX_DATA;

    if (profileName.toLowerCase() === 'zairox') {
      return ZAIROX_DATA;
    }

    if (profileName.toLowerCase() === 'tester') {
      return TESTER_DATA;
    }

    if (
      profileName.toLowerCase() ===
      'Micha%C5%82%20W%C5%82odarczyk'.toLowerCase()
    ) {
      return MICHAL_DATA;
    }

    return {
      name: sampleSize(this.mockRecords, 1)[0].nickname,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    };
  }

  public static async getBestTipper(
    profileName: string,
    timeRange: BestTiperTimeRange
  ): Promise<BestTipper[]> {
    if (typeof profileName !== 'string') {
      throw new Error('Pass profile name as string!');
    }

    await sleep(500);

    const dayInMillis = 24 * 60 * 60 * 1000;
    const weekInMillis = dayInMillis * 7;
    const monthInMillis = dayInMillis * 30;

    let timeFromFilter = 0;

    switch (timeRange) {
      case 'today':
        timeFromFilter = dayInMillis;
        break;
      case 'week':
        timeFromFilter = weekInMillis;
        break;
      case 'month':
        timeFromFilter = monthInMillis;
        break;
    }

    const currentDate = new Date().getTime();

    const filteredStreamerMessages = filter(
      this.mockRecords,
      (message) => currentDate - timeFromFilter <= message.date
    );

    return orderBy(
      sampleSize(
        map(filteredStreamerMessages, (streamerTipper) => ({
          nickname: streamerTipper.nickname,
          sumOfTips: sumBy(
            filter(
              filteredStreamerMessages,
              (streamerTip) => streamerTipper.nickname === streamerTip.nickname
            ),
            'tip'
          ),
        })),
        3
      ),
      'sumOfTips',
      ['desc']
    );
  }

  public static async lastStreamerTips(profileName: string) {
    await sleep(1000);

    if (typeof profileName !== 'string') {
      throw new Error('Pass profile name as string!');
    }

    return sampleSize(this.mockRecords, 10);
  }
}
