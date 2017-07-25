import { GoogleTranslationService } from './GoogleTranslationService';
import { GoogleTranslateAPIParser } from './GoogleTranslateAPIParser';
import * as nock from 'nock';

describe('GoogleTranslationService', () => {
  let gtService = null;

  const locale = {
    language: 'English',
    capitol: 'London',
    greetings: 'Welcome to England and have nice day!',
    units: {
      time_hour: 'hour',
      currency: 'GBP',
      drink: 'tea'
    }
  };

  beforeAll(() => {
    gtService = new GoogleTranslationService(
      new GoogleTranslateAPIParser(GoogleTranslationService.BATH_REQ_SEP)
    );
  });

  it('should create url for request of translation single word', () => {
    const dogFromEngToPl =
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pl&dt=t&q=dog';
    expect(gtService.getTranslateReqUrl('en', 'pl', 'dog')).toEqual(
      dogFromEngToPl
    );

    const arkaGdyniaFromPlToEs =
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=pl&tl=es&dt=t&q=arka%20gdynia';
    expect(gtService.getTranslateReqUrl('pl', 'es', 'arka gdynia')).toEqual(
      arkaGdyniaFromPlToEs
    );
  });

  it('should create batch translation url', () => {
    const bathTranslateUrl = gtService.getBatchTranslateUrl('en', 'pl', locale);
    expect(bathTranslateUrl).toEqual(
      [
        'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pl&dt=t&q=',
        'English',
        GoogleTranslationService.BATH_REQ_SEP,
        'London',
        GoogleTranslationService.BATH_REQ_SEP,
        'Welcome%20to%20England%20and%20have%20nice%20day!',
        GoogleTranslationService.BATH_REQ_SEP,
        'hour',
        GoogleTranslationService.BATH_REQ_SEP,
        'GBP',
        GoogleTranslationService.BATH_REQ_SEP,
        'tea'
      ].join('')
    );
  });

  it('should translate locale', async () => {
    const scope = nock('https://translate.googleapis.com')
      .get(/.+/gim)
      .reply(200, [
        [
          [
            'Angielski ~ Londyn ~ Witamy w Anglii i miłym dniu! ~ godzina ~ GBP ~ herbata',
            'English ~ London ~ hour ~ GBP ~ tea',
            null,
            null,
            3
          ]
        ],
        null,
        'en'
      ]);

    const translated = await gtService.translate('en', 'pl', locale);

    expect(translated).toEqual({
      language: 'Angielski',
      capitol: 'Londyn',
      greetings: 'Witamy w Anglii i miłym dniu!',
      units: {
        time_hour: 'godzina',
        currency: 'GBP',
        drink: 'herbata'
      }
    });
  });
});
