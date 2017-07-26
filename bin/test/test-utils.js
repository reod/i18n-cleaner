"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = require("path");
const writeFileAsync = util_1.promisify(fs_1.writeFile);
const unlinkAsync = util_1.promisify(fs_1.unlink);
function getPlaygroundPath() {
    return path_1.join('./test', 'playground');
}
exports.getPlaygroundPath = getPlaygroundPath;
;
function getPlaygroundFiles() {
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
}
exports.getPlaygroundFiles = getPlaygroundFiles;
;
function getPlaygroundFilesPaths() {
    return getPlaygroundFiles().map(file => path_1.join(getPlaygroundPath(), file.name));
}
exports.getPlaygroundFilesPaths = getPlaygroundFilesPaths;
;
function createSamplePath() {
    return path_1.join('arka', 'gdynia', 'kura', 'wiśnia', 'legia.win');
}
exports.createSamplePath = createSamplePath;
;
async function createPlayground() {
    await Promise.all(getPlaygroundFiles()
        .map(file => {
        const path = path_1.join(getPlaygroundPath(), file.name);
        const content = JSON.stringify(file.content, null, 2);
        return writeFileAsync(path, content);
    }));
}
exports.createPlayground = createPlayground;
;
async function cleanPlayground() {
    for (const { name } of getPlaygroundFiles()) {
        const path = path_1.join(getPlaygroundPath(), name);
        const backup = `${path}_i18n-manager_backup_file`;
        try {
            await unlinkAsync(path);
            await unlinkAsync(backup);
        }
        catch (e) { }
    }
}
exports.cleanPlayground = cleanPlayground;
;
//# sourceMappingURL=test-utils.js.map