import { writeFile, unlink } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const writeFileAsync = promisify(writeFile);
const unlinkAsync = promisify(unlink);


export function getPlaygroundPath(): string {
  return join('./test', 'playground');
};

export function getPlaygroundFiles(): Array<any> {
  return [
    {
      name: 'en.json',
      content: {
        "language": "English",
        "capitol": "London",
        "units": {
          "time_hour": "hour",
          "currency": "GBP",
          "drink": "tea"
        }
      }
    },
    {
      name: 'pl.json',
      content: {
        "language": "Polski",
        "capitol": "Warszawa",
        "units": {
          "time_hour": "godzina",
          "currency": "PLN"
        }
      }
    },
    {
      name: 'us.json',
      content: {
        "deal_type": {
          "shopping": "shopping",
          "travel": "travel",
          "local": "local",
          "featured": "featured"
        },
        "deal_status": {
          "preview": "preview",
          "ready": "ready",
          "pause": "paused",
          "special": "special",
          "sold_out": "sold out",
          "coming_soon": "coming soon",
          "ended": "deal ended"
        },
        "language": "English",
        "capitol": "London",
        "fresh_deals": "recent deals",
        "bestseller": "bestseller",
        "more_local_deals": "more local deals",
        "more_shopping_deals": "more shopping deals",
        "buyers": "buyers",
        "buy": "buy",
        "old_price": "old price",
        "new_price": "new price",
        "address": "address",
        "map": "map",
        "hightlights": "hightlights",
        "terms": "terms",
        "booking": "booking",
        "home_page": "home page",
        "about_page": "about page",
        "loading": "loading",
        "search": "search",
        "search_query": "search query",
        "all": "all",
        "sign_in": "Sign in",
        "email": "email address",
        "password": "Password",
        "remember_me": "Rememeber me",
        "send": "Send",
        "sign_up": "Sign up",
        "name": "Name",
        "surname": "Surname",
        "password_repeat": "Repeat password",
        "tos_agreement": "I agree to terms",
        "dashboard": "Dashboard",
        "sign_out": "Sign out",
        "api_error": "Fatal error",
        "used_deals": "Used deals",
        "my_deals": "My deals",
        "expires": "Expires",
        "bought": "Bought",
        "valid_codes": "Deals",
        "on_the_way": "On the way",
        "deal_history": "Deal hitory",
        "search_placeholder": "Search Let's deal",
        "search_submit": "Search",
        "my_account": "My account",
        "support": "Support",
        "where_are_you": "Where are you?",
        "why_select_location": "In order to show you local deals we need to know your approximate location.",
        "detect": "Detect"
      }
    }
  ];
};

export function getPlaygroundFilesPaths(): Array<string> {
  return getPlaygroundFiles().map(file => join(getPlaygroundPath(), file.name));
};

export function createSamplePath(): string {
  return join('arka', 'gdynia', 'kura', 'wiśnia', 'legia.win');
};

export async function createPlayground(): Promise<void> {
  await Promise.all(
    getPlaygroundFiles()
      .map(file => {
        const path = join(getPlaygroundPath(), file.name);
        const content = JSON.stringify(file.content, null, 2);

        return writeFileAsync(path, content);
      })
  );
};

export async function clearPlayground(): Promise<void> {
  for (const { name } of getPlaygroundFiles()) {
    const path = join(getPlaygroundPath(), name);
    const backup = `${path}_i18n-manager_backup_file`;

    try {
      await unlinkAsync(path);
      await unlinkAsync(backup);
    } catch (e) {}
  }
};
