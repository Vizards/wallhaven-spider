# Wallhaven-Spider

## Intro

A BackGround Image Spider for wallhaven.cc

## Install

```
npm install wallhaven-spider -g
```
## How to use

Usage

```
wallhaven-spider [options]
```

Options:

```
-h, --help                      output usage information
-c --categories <categories>    Wallpaper's categories
-p --purity <purity>            Wallpaper's purity
-r --resolutions <resolutions>  Wallpaper's resolutions
-t --ratios <ratios>            Wallpaper's ratios
-s --sorting <sorting>          Wallpaper's sorting
-o --order <order>              Wallpaper's order
```

 How to use these arguments:
 
```
<categories>              100|101|110|111|010|011|001
/*
 * The three Numbers represent Wallpaper's category:
 * General/Anime/People
 * General(1/0), Anime(1/0), People(1/0)
 * 1 means the result will contains them, 0 means won't
 */
    
<purity>                  100|010|110
/* 
 * SFW(1/0), Sketchy(1/0), NSFW(ALWAYS 0)
 */
 
<resolutions>             1024x768|1280x800|1366x768|1280x960|1440x900|1600x900|1280x1024|1600x1200|1680x1050|1920x1080|1920x1200|2560xx1440|2560x1600|3840x1080|5760x1080|3840x2160
<ratios>                  4x3|5x4|16x9|16x10|21x9|32x9|48x9|9x16|10x16
<sorting>                 relevans|random|date_added|views|favorites
<order>                   asc|desc

```

## Enjoy Yourself!


