/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "client.js",
    "revision": "9f6c72ea4e6520d8282efc6f4ebede19"
  },
  {
    "url": "index.html",
    "revision": "fecc6e6e4ae0bb3082549104f1d111bb"
  },
  {
    "url": "page1.html",
    "revision": "5229a9c54f8d600b60c2369fd9240c53"
  },
  {
    "url": "page2.html",
    "revision": "acda6eafb9c862468eea5aa058f6139f"
  },
  {
    "url": "page3.html",
    "revision": "07429e64e69ebdab9f082c97d8959f7b"
  },
  {
    "url": "page4.html",
    "revision": "2030bfc90a734193d9332bebb0df68b4"
  },
  {
    "url": "page5.html",
    "revision": "dc4534cfa2b92bb0b27dd6abd8d1938c"
  },
  {
    "url": "style.css",
    "revision": "da2a32b52aa6785e66e0582e6ea0e87f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
