# i18n-manager
Tool that helps manage i18n files in your project.

## Install
```sh
npm install -g i18n-manager
```

## Available options
### Clean i18n files
```sh
i18n-manager list [directory]
  -f, --fill-missing      Fill missing keys based on base file
  -a, --sort              Sort keys based on base file
  -s, --save              Write result to files (creates backup by default)
```
#### Options
**Important**: If you want to save result of this command use `-s` flag. It will create backup for default
appending `_i18n-manager_backup_file` sufix to files that are modified.
#### Fill missing keys based on base locale
```sh
-f, --fill-missing      Fill missing keys based on base file
```
#### *Example*
Given we have two i18n json files – `en.json`:
```json
{
  "language": "English",
  "capitol": "London",
  "units": {
    "time_hour": "hour",
    "currency": "GBP",
    "drink": "tea"
  }
}
```
... and `pl.json`:
```json
{
  "language": "Polski",
  "capitol": "Warszawa",
  "units": {
    "time_hour": "godzina",
    "currency": "PLN"
  }
}
```
After running:
```sh
i18n-manager clean app/i18n -f en.json
```
...we should see output in console:
```
i18n files cleaned.
base file:
{ language: 'English',
  capitol: 'London',
  units: { time_hour: 'hour', currency: 'GBP', drink: 'tea' } }
cleaned files:
[ { language: 'Polski',
    capitol: 'Warszawa',
    units: { currency: 'PLN', time_hour: 'godzina', drink: 'tea' } } ]
```
Missing fields in `pl.json` should be replaced with values from base `en.json` file.
The most convinient option is to use all options at once:
```sh
i18n-manager clean app/i18n -fas en.json
```
It will:
* **fill** missing keys
* **sort** keys based on base file
* **save** result to files and creates backup for all fill that were changed