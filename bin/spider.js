#!/usr/bin/env node

/**
 * Created by Vizards on 2017/1/1.
 */

const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const program = require('commander');

program
  .version('0.0.1')
  .command('wallhaven-spider')
  .option('-c --categories <categories>', 'Wallpaper\'s categories', /^(100|101|110|111|010|011|001)$/i, '111')
  .option('-p --purity <purity>', 'Wallpaper\'s purity', /^(100|010|111)$/i, '110')
  .option('-r --resolutions <resolutions>', 'Wallpaper\'s resolutions', /^(1024x768|1280x800|1366x768|1280x960|1440x900|1600x900|1280x1024|1600x1200|1680x1050|1920x1080|1920x1200|2560xx1440|2560x1600|3840x1080|5760x1080|3840x2160)$/i, '')
  .option('-t --ratios <ratios>', 'Wallpaper\'s ratios',  /^(4x3|5x4|16x9|16x10|21x9|32x9|48x9|9x16|10x16)$/i, '')
  .option('-s --sorting <sorting>', 'Wallpaper\'s sorting',  /^(relevans|random|date_added|views|favorites)$/i, 'date_added')
  .option('-o --order <order>', 'Wallpaper\'s order',  /^(asc|desc)$/i, 'asc')
  .action((options) => {
    const url = 'https://alpha.wallhaven.cc/search?categories=' + options.categories + '&purity=' + options.purity + '&resolutions=' + options.resolutions + '&ratios=' + options.ratios + '&sorting=' + options.sorting + '&order=' + options.order;
    console.log('Fetching Wallpapers from ' + url);
    https.get(url, (res) => {
      let html = '';
      res.setEncoding('utf-8');
      res.on('data', (chunk) => {
        html += chunk;
      });

      res.on('end', () => {

        const $ = cheerio.load(html);
        const figure_num = parseInt(10*Math.random());
        const file_id = $('.thumb').eq(figure_num).attr('data-wallpaper-id');
        console.log('Random Selected Image Number: ' + file_id);
        const src = 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-' + file_id + '.jpg';

        console.log('Successfully Get Wallpaper\'s URL: '+ src);
        console.log('Starting Download...Please Wait...');
        console.log('Until Download Successful or 3 Minutes Later I will Exit Automatically.');

        request.head(src, (err, res, body) => {
          if (err) {
            console.log('Download Error:' + err);
          }
        });
        setTimeout(() => process.exit(0), 180000);
        request(src).pipe(fs.createWriteStream('./image/' + 'wallhaven-' + file_id + '.jpg'));
      })
    })
  })
  .on('--help', () => {
    console.log('  How to use these arguments:');
    console.log('');
    console.log('    Categories can be set to 100|101|110|111|010|011|001');
    console.log('    The three Numbers represent Wallpaper\'s category: General/Anime/People');
    console.log('    General(1/0), Anime(1/0), People(1/0), 1 means the result will contains them, 0 means won\'t');
    console.log('');
    console.log('    Purity can be set to 100|010|110');
    console.log('    SFW(1/0), Sketchy(1/0), NSFW(ALWAYS 0)');
    console.log('');
    console.log('    Resolutions can be set to 1024x768|1280x800|1366x768|1280x960|1440x900|1600x900|1280x1024|1600x1200|1680x1050|1920x1080|1920x1200|2560xx1440|2560x1600|3840x1080|5760x1080|3840x2160');
    console.log('    Ratios can be set to 4x3|5x4|16x9|16x10|21x9|32x9|48x9|9x16|10x16');
    console.log('    Sorting can be set to relevans|random|date_added|views|favorites');
    console.log('    Order can be set to asc|desc');
    console.log('');
    console.log(' Enjoy Yourself!');
    console.log('');
  });


process.argv.splice(2, 0, 'wallhaven-spider');
program.parse(process.argv);
