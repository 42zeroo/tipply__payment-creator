/**
 * ALL CREDITS WITH NICKNAMES TO CHAT GPT
 */

import random from 'lodash/random';
import map from 'lodash/map';
import { StreamerTip } from 'src/utils/services/StreamerDataAPI';

const getRandomDateWithinOneMonth = (): Date => {
  const currentDate = new Date();
  const oneMonthLater = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDay());
  const randomTime = random(currentDate.getTime(), oneMonthLater.getTime());
  return new Date(randomTime);
};

const getRandomSum = () => random(10, 5000, false) / 10;

export const MOCK_STREAMER_NICKNAMES: string[] = [
  'MinecraftMistrz',
  'WielkiValorant',
  'DutyBezkompromisowe',
  'CSMistrzGry',
  'LegendaPrzywoływacza',
  'KlockowyBohater',
  'StrzelecWandala',
  'TajemniczySnajper',
  'MiażdżącyFrag',
  'DuszonyStrażnik',
  'NiszczycielBloków',
  'EkspertTaktyczny',
  'OkrutnyŻołnierz',
  'ZabójczaAwp',
  'ZwinnyNinja',
  'MistrzowskieCzarowanie',
  'PixelowyZabójca',
  'SkrytySnajper',
  'ZłodziejCzasu',
  'StrażnikBomby',
  'DemonicznyKról',
  'OgnistyMag',
  'RozpruwaczCzasu',
  'PogromcaPotworów',
  'StrażnikNexusa',
  'NocnyTerror',
  'KrwiożerczyŁowca',
  'ZemstaTerroryzmu',
  'GrającySnajper',
  'PodbójZombie',
  'KomandosŁupieżca',
  'TornadoDzikiegoWestchnienia',
  'LegendaE-Sportu',
  'StrażnikKlucza',
  'ŁamaczBarier',
  'Arcyczarodziej',
  'ZabójczyTajfun',
  'KapitanPenta',
  'DemonicznyWojownik',
  'PorażającyKról',
  'ZłodziejDusz',
  'PrzewrotnyAssassin',
  'MrocznyMistrz',
  'NiezwykłyStrzelec',
  'KrwiożerczyZabójca',
  'MającyCel',
  'OkrutnyTerror',
  'ŁowcaNagród',
  'ZabójczyTropiciel',
  'RozdzieraczObłoku',
  'DemonicznyPierścień',
  'KrwawyNocny',
  'StrażnikOdwetu',
  'ZłowrogiOkruch',
  'MrocznyKasyno',
  'PrzebudzonyWojownik',
  'ZagubionyDuch',
  'KapitanNiszczyciel',
  'OkrutnyZabójca',
  'MistrzGry',
];

export const MOCK_STREAMER_TIPS: StreamerTip[] = map(
  MOCK_STREAMER_NICKNAMES,
  () => ({
    nickname: MOCK_STREAMER_NICKNAMES[random(MOCK_STREAMER_NICKNAMES.length - 1)],
    tip: getRandomSum(),
    date: getRandomDateWithinOneMonth().getTime()
  })
);
