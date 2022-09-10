if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const n = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[n]) return;
    let r = {};
    const t = (e) => a(e, n),
      d = { module: { uri: n }, exports: r, require: t };
    s[n] = Promise.all(i.map((e) => d[e] || t(e))).then((e) => (c(...e), r));
  };
}
define(['./workbox-5f5b08d6'], function (e) {
  'use strict';
  importScripts('fallback-sTinMjldhDMCooanbE7l5.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/static/chunks/494-f7f326cc2e391caf.js', revision: 'f7f326cc2e391caf' },
        { url: '/_next/static/chunks/61-551a57588939bf20.js', revision: '551a57588939bf20' },
        { url: '/_next/static/chunks/651.bd3ee586694c39ed.js', revision: 'bd3ee586694c39ed' },
        { url: '/_next/static/chunks/683-92daf4334bbccf2d.js', revision: '92daf4334bbccf2d' },
        { url: '/_next/static/chunks/806-5f072e0c8c09f04c.js', revision: '5f072e0c8c09f04c' },
        { url: '/_next/static/chunks/839-90bc7c76e0da8078.js', revision: '90bc7c76e0da8078' },
        { url: '/_next/static/chunks/977-81ad82cc15ec0bd8.js', revision: '81ad82cc15ec0bd8' },
        { url: '/_next/static/chunks/ea88be26-0916539e7153d77e.js', revision: '0916539e7153d77e' },
        { url: '/_next/static/chunks/framework-4556c45dd113b893.js', revision: '4556c45dd113b893' },
        { url: '/_next/static/chunks/main-4d95ae84c389f089.js', revision: '4d95ae84c389f089' },
        {
          url: '/_next/static/chunks/pages/_app-979cbbd8aa0dacbe.js',
          revision: '979cbbd8aa0dacbe',
        },
        {
          url: '/_next/static/chunks/pages/_error-1a5ee65903ffb785.js',
          revision: '1a5ee65903ffb785',
        },
        {
          url: '/_next/static/chunks/pages/_offline-6bc8b3bd8bda672e.js',
          revision: '6bc8b3bd8bda672e',
        },
        {
          url: '/_next/static/chunks/pages/alone-c095547f1381dca3.js',
          revision: 'c095547f1381dca3',
        },
        {
          url: '/_next/static/chunks/pages/alone/invited/%5Bid%5D-dc7665ad384da2a2.js',
          revision: 'dc7665ad384da2a2',
        },
        {
          url: '/_next/static/chunks/pages/edit-profile-ef64d054c070a743.js',
          revision: 'ef64d054c070a743',
        },
        {
          url: '/_next/static/chunks/pages/folder-0c5655ed34c07e83.js',
          revision: '0c5655ed34c07e83',
        },
        {
          url: '/_next/static/chunks/pages/list-intro-c834be530b0e1f66.js',
          revision: 'c834be530b0e1f66',
        },
        {
          url: '/_next/static/chunks/pages/login-003d6f0cfecb1806.js',
          revision: '003d6f0cfecb1806',
        },
        {
          url: '/_next/static/chunks/pages/manage-8be91394fbc41880.js',
          revision: '8be91394fbc41880',
        },
        {
          url: '/_next/static/chunks/pages/packing-list-39907c5f748fad85.js',
          revision: '39907c5f748fad85',
        },
        {
          url: '/_next/static/chunks/pages/preview-e188dd07c31ca93d.js',
          revision: 'e188dd07c31ca93d',
        },
        {
          url: '/_next/static/chunks/pages/profile-c080045363380913.js',
          revision: 'c080045363380913',
        },
        {
          url: '/_next/static/chunks/pages/select-template-bffda215f007b163.js',
          revision: 'bffda215f007b163',
        },
        {
          url: '/_next/static/chunks/pages/test-29c5a4788e210da0.js',
          revision: '29c5a4788e210da0',
        },
        {
          url: '/_next/static/chunks/pages/together-1e446feab1565874.js',
          revision: '1e446feab1565874',
        },
        {
          url: '/_next/static/chunks/pages/together/invited-c9133a85af74aeda.js',
          revision: 'c9133a85af74aeda',
        },
        {
          url: '/_next/static/chunks/polyfills-0d1b80a048d4787e.js',
          revision: '40ccea369337cec877151c906f22814d',
        },
        { url: '/_next/static/chunks/webpack-d1846840e1028334.js', revision: 'd1846840e1028334' },
        { url: '/_next/static/css/250ff86455070da4.css', revision: '250ff86455070da4' },
        { url: '/_next/static/css/af16e0fa0c206764.css', revision: 'af16e0fa0c206764' },
        {
          url: '/_next/static/media/ButtonX.b7900d21.png',
          revision: '5807462fb9da9f4ba32ac1dff3908737',
        },
        {
          url: '/_next/static/media/ErrorImage.cc4b4947.png',
          revision: '082cf5a58924e970b4bbf1d2c3152b11',
        },
        {
          url: '/_next/static/media/back_ic.118a0e08.svg',
          revision: '8211dc462bd66260bcef0c47920d1851',
        },
        {
          url: '/_next/static/media/concert.6a0cd56a.png',
          revision: '034b51be431b2a0eb86cdc059363a2cf',
        },
        {
          url: '/_next/static/media/edit_color_ic.9830777e.svg',
          revision: '802664ef77193383cf018ff9bfa0a57a',
        },
        {
          url: '/_next/static/media/fab.ba29cbb8.svg',
          revision: '6d9fa9a95d35652afe35f2ed1006108b',
        },
        {
          url: '/_next/static/media/fab_rotate.9958b8eb.svg',
          revision: 'a65581470a2e769fd4cf4d71a3f769ca',
        },
        {
          url: '/_next/static/media/forShare.43867dbf.png',
          revision: 'd3be88b2b6b78f62efdf10298afad131',
        },
        {
          url: '/_next/static/media/hole_ic.d2b5b311.svg',
          revision: 'be4fdccb9e893fffc8afcbf559ff55b4',
        },
        {
          url: '/_next/static/media/hole_selected_ic.4d2bb1fc.svg',
          revision: '41276f8a13c4efe3161d951fefafe65e',
        },
        {
          url: '/_next/static/media/home_alone.9d0c6c49.png',
          revision: '3ed5d9c884b42edc18f79955ddee47b6',
        },
        {
          url: '/_next/static/media/home_together.8b20261f.png',
          revision: '1093c79ca8a961b0d1cfb4fc3e3b366b',
        },
        {
          url: '/_next/static/media/iCheck.9748d429.svg',
          revision: '1a0d3d98f5b93718368a743ea8f180f8',
        },
        {
          url: '/_next/static/media/iCheckPink.8207ed3d.svg',
          revision: '1477c68c9daab0ac702b4bd0474015a2',
        },
        {
          url: '/_next/static/media/iClose.c168595c.svg',
          revision: '188eb4a86291e5d15c2bb73b718d8eb9',
        },
        {
          url: '/_next/static/media/iEdit.184e8e1a.svg',
          revision: '54ccaa4ee792d7ec3a4a8ea87b7d782f',
        },
        {
          url: '/_next/static/media/iRightArrow.10faacf0.svg',
          revision: '7d4ed9fa77627401767d44e87e676dce',
        },
        {
          url: '/_next/static/media/iShowMore.9fc83c71.svg',
          revision: 'cb85e547d0ec147cbba63818b0716d74',
        },
        {
          url: '/_next/static/media/iSwipeBar.f55f1eae.svg',
          revision: '7ce46109fcda7c64d4cfc7d14d021ef5',
        },
        {
          url: '/_next/static/media/iTrash.e8b17229.svg',
          revision: '62c99ed59d12d75e3eefcf3231b0d5d6',
        },
        {
          url: '/_next/static/media/jeju.58cf121d.png',
          revision: '2657b53d3c79ec4a625d7237e271837d',
        },
        {
          url: '/_next/static/media/kakaoLogin.c4497388.png',
          revision: 'a2b6e662a96535392f486c6258395f0c',
        },
        {
          url: '/_next/static/media/kebab_ic.0a8c49ae.svg',
          revision: '7f80d8b4ac93d8d5ad2852d6cd586b2e',
        },
        {
          url: '/_next/static/media/korea_travel.8aa60364.png',
          revision: '67380b4a715c46f2706dfce9d1ee1cc4',
        },
        {
          url: '/_next/static/media/loginLogo.a9632396.svg',
          revision: '4ac97ea531fbd938010d8f2a13d1c5f4',
        },
        {
          url: '/_next/static/media/logo.74efb93b.svg',
          revision: '7c8faabf5c3dfa1e837e5ec33fb9c858',
        },
        {
          url: '/_next/static/media/member_ic.68fb09e2.svg',
          revision: '5c3549a82db1242eef99de3064307d80',
        },
        {
          url: '/_next/static/media/oversea_travel.42d6faf8.png',
          revision: '2516e7a090505514c465426f100eae32',
        },
        {
          url: '/_next/static/media/pet.19372f4a.png',
          revision: '2c0fd3e95184b85096af51c6f9ab967b',
        },
        {
          url: '/_next/static/media/plus_ic.6a868fb0.svg',
          revision: '327b44d42399158bad2dfd54030f7a75',
        },
        {
          url: '/_next/static/media/pmLogo.2f7b8cf9.svg',
          revision: '5b791acf1df1f31c71fa5cafb1ffafb6',
        },
        {
          url: '/_next/static/media/profile1.669c22a4.png',
          revision: '0abc30986d65223e931fdbedee0307ae',
        },
        {
          url: '/_next/static/media/profile2.f87ae46b.png',
          revision: '1f13b49c4a80e49687875bc2a3b44c4a',
        },
        {
          url: '/_next/static/media/profile3.e53b47e4.png',
          revision: 'a9730e19f12673f23d3d78a33d5c08b3',
        },
        {
          url: '/_next/static/media/profile4.38ff9aeb.png',
          revision: 'b37ac9e4314a2ff911032c72a1e4421b',
        },
        {
          url: '/_next/static/media/profile5.b4799721.png',
          revision: '7a84503b80b67086a245f1af2bb94e95',
        },
        {
          url: '/_next/static/media/profile6.1df031c0.png',
          revision: '19b69574da74b59186fa6dfad7e2974e',
        },
        {
          url: '/_next/static/media/profile_ic.044159bf.svg',
          revision: 'd895280ef956c5b20ef7701a14756392',
        },
        {
          url: '/_next/static/media/random1.cbb27df4.png',
          revision: 'b2e9f2e7becde7fbefde74f7c91dbf8b',
        },
        {
          url: '/_next/static/media/random2.1a287ecd.png',
          revision: 'bffc7a5e1ca0767d46bacb3e6e32208f',
        },
        {
          url: '/_next/static/media/random3.290e82fa.png',
          revision: '0302274ea34c3e5d575fe0bafb3925fb',
        },
        {
          url: '/_next/static/media/random4.b9dc22de.png',
          revision: '286fbb15ffc695036c76d6bed8511c9c',
        },
        {
          url: '/_next/static/media/share_ic.1ec9eeb5.svg',
          revision: '830dbe6f0a78fb4e9cb003b41c70369d',
        },
        {
          url: '/_next/static/media/toeic.b8d3ced7.png',
          revision: 'b87b5f6ea7fdc580a9e8fb11ad9832be',
        },
        {
          url: '/_next/static/sTinMjldhDMCooanbE7l5/_buildManifest.js',
          revision: 'a9c949e5db229b7dc30acd4acc928dc0',
        },
        {
          url: '/_next/static/sTinMjldhDMCooanbE7l5/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_offline', revision: 'sTinMjldhDMCooanbE7l5' },
        { url: '/assets/index.ts', revision: '841bba549d561f0cbabda55b6205c0ff' },
        { url: '/assets/lottie/loading.json', revision: '850c0691f398b26d4bce9e393eed47c9' },
        { url: '/assets/png/ButtonX.png', revision: '5807462fb9da9f4ba32ac1dff3908737' },
        { url: '/assets/png/ErrorImage.png', revision: '082cf5a58924e970b4bbf1d2c3152b11' },
        { url: '/assets/png/character1.png', revision: '4effd97dbac56e55a163a265fd8833e9' },
        { url: '/assets/png/character2.png', revision: 'c2670219873be46f6d73790f477457cc' },
        { url: '/assets/png/character3.png', revision: '8669c7de57cc1d8f872e7a2ebf2c9caa' },
        { url: '/assets/png/character4.png', revision: '6d43ec4cdcc2b460affd1b4e8e4c3c52' },
        { url: '/assets/png/character5.png', revision: '7db8f80f48744ebce596c87315daa438' },
        { url: '/assets/png/character6.png', revision: '8bbf79502ab04ca258518ff379facae2' },
        { url: '/assets/png/concert.png', revision: '034b51be431b2a0eb86cdc059363a2cf' },
        { url: '/assets/png/crown.png', revision: '25bf6e36af516df6bff88a5be40ca354' },
        { url: '/assets/png/editButton.png', revision: '6699284b47b94de4257a6f4b724b5c7b' },
        { url: '/assets/png/forShare.png', revision: 'd3be88b2b6b78f62efdf10298afad131' },
        { url: '/assets/png/home_alone.png', revision: '3ed5d9c884b42edc18f79955ddee47b6' },
        { url: '/assets/png/home_together.png', revision: '1093c79ca8a961b0d1cfb4fc3e3b366b' },
        { url: '/assets/png/jeju.png', revision: '2657b53d3c79ec4a625d7237e271837d' },
        { url: '/assets/png/kakaoLogin.png', revision: 'a2b6e662a96535392f486c6258395f0c' },
        { url: '/assets/png/kebabButton.png', revision: '28d1da2d7a5fb6e1d01ba9373053d369' },
        { url: '/assets/png/korea_travel.png', revision: '67380b4a715c46f2706dfce9d1ee1cc4' },
        { url: '/assets/png/landing-bg.png', revision: 'cccba3139806af874d07f4a92b8fba41' },
        { url: '/assets/png/oversea_travel.png', revision: '2516e7a090505514c465426f100eae32' },
        { url: '/assets/png/pet.png', revision: '2c0fd3e95184b85096af51c6f9ab967b' },
        { url: '/assets/png/profile1.png', revision: '0abc30986d65223e931fdbedee0307ae' },
        { url: '/assets/png/profile2.png', revision: '1f13b49c4a80e49687875bc2a3b44c4a' },
        { url: '/assets/png/profile3.png', revision: 'a9730e19f12673f23d3d78a33d5c08b3' },
        { url: '/assets/png/profile4.png', revision: 'b37ac9e4314a2ff911032c72a1e4421b' },
        { url: '/assets/png/profile5.png', revision: '7a84503b80b67086a245f1af2bb94e95' },
        { url: '/assets/png/profile6.png', revision: '19b69574da74b59186fa6dfad7e2974e' },
        { url: '/assets/png/random1.png', revision: 'b2e9f2e7becde7fbefde74f7c91dbf8b' },
        { url: '/assets/png/random2.png', revision: 'bffc7a5e1ca0767d46bacb3e6e32208f' },
        { url: '/assets/png/random3.png', revision: '0302274ea34c3e5d575fe0bafb3925fb' },
        { url: '/assets/png/random4.png', revision: '286fbb15ffc695036c76d6bed8511c9c' },
        { url: '/assets/png/removeMember.png', revision: '650803b23931b50ad6fdc4834f39433e' },
        { url: '/assets/png/toeic.png', revision: 'b87b5f6ea7fdc580a9e8fb11ad9832be' },
        { url: '/assets/pwa/apple-icon-180.png', revision: 'fcf0de47676b5dc91a85f58c69574526' },
        {
          url: '/assets/pwa/apple-splash-1125-2436.jpg',
          revision: '7c366728aafa5db5f2e6ccedd09113be',
        },
        {
          url: '/assets/pwa/apple-splash-1136-640.jpg',
          revision: '3aa39f51ebab32bf7c5ce8227d55ce3d',
        },
        {
          url: '/assets/pwa/apple-splash-1170-2532.jpg',
          revision: '4ad6793c7d74ed3647b0ced45eab762c',
        },
        {
          url: '/assets/pwa/apple-splash-1242-2208.jpg',
          revision: 'a17f5056486d8c3feb2dc3428b33939a',
        },
        {
          url: '/assets/pwa/apple-splash-1242-2688.jpg',
          revision: '545329510f362e188a898955cfd73fb1',
        },
        {
          url: '/assets/pwa/apple-splash-1284-2778.jpg',
          revision: '2f79a5dc706527ca49cd640e56971761',
        },
        {
          url: '/assets/pwa/apple-splash-1334-750.jpg',
          revision: '2b7c93a3468a50555a81a170a9f7c052',
        },
        {
          url: '/assets/pwa/apple-splash-1536-2048.jpg',
          revision: '2269559558bfe8c081e932cc137d1c6e',
        },
        {
          url: '/assets/pwa/apple-splash-1620-2160.jpg',
          revision: '11c6059656a6abee3fe67cd58c1def8c',
        },
        {
          url: '/assets/pwa/apple-splash-1668-2224.jpg',
          revision: '4e261b8564b7461aa3008caed1224923',
        },
        {
          url: '/assets/pwa/apple-splash-1668-2388.jpg',
          revision: '87ac67db8087444baf79b73a7ffcdb5a',
        },
        {
          url: '/assets/pwa/apple-splash-1792-828.jpg',
          revision: 'f0e788b3f56cfd44b1f9c148228c5e0e',
        },
        {
          url: '/assets/pwa/apple-splash-2048-1536.jpg',
          revision: '40594c3a0864a8f93b353ef13ba745a7',
        },
        {
          url: '/assets/pwa/apple-splash-2048-2732.jpg',
          revision: 'beb4cca3d5b7f38d508a3b5e2b9ee1b1',
        },
        {
          url: '/assets/pwa/apple-splash-2160-1620.jpg',
          revision: '286aa7c13e102694cff65641191d7f2e',
        },
        {
          url: '/assets/pwa/apple-splash-2208-1242.jpg',
          revision: 'adc7988be306be2230d5ecc4d66e4ce5',
        },
        {
          url: '/assets/pwa/apple-splash-2224-1668.jpg',
          revision: '6bdc64c98ff86122c4219812d56280c4',
        },
        {
          url: '/assets/pwa/apple-splash-2388-1668.jpg',
          revision: '6b7cffc25c743fc90751f0b902691109',
        },
        {
          url: '/assets/pwa/apple-splash-2436-1125.jpg',
          revision: '47e1064f63ec91ddb8d1e572ad783f4d',
        },
        {
          url: '/assets/pwa/apple-splash-2532-1170.jpg',
          revision: '77cd5e60ef544b6943a59113a6639a80',
        },
        {
          url: '/assets/pwa/apple-splash-2688-1242.jpg',
          revision: 'd79a84978fc511fc586e3da48a38b88d',
        },
        {
          url: '/assets/pwa/apple-splash-2732-2048.jpg',
          revision: 'a4b69f39524ed5fd0bab0d0929c51e5b',
        },
        {
          url: '/assets/pwa/apple-splash-2778-1284.jpg',
          revision: 'e73dc620e363c53e0cd8c2d9a9e84a98',
        },
        {
          url: '/assets/pwa/apple-splash-640-1136.jpg',
          revision: '8a08ba57a37063cb7d7740cd1a084341',
        },
        {
          url: '/assets/pwa/apple-splash-750-1334.jpg',
          revision: '0f74a1e4357494516bee9d70160b92e0',
        },
        {
          url: '/assets/pwa/apple-splash-828-1792.jpg',
          revision: '6ac043d8d7dfecc350a91d3da865fd08',
        },
        {
          url: '/assets/pwa/manifest-icon-192.maskable.png',
          revision: '2cd14f23ae966f2f7471e5df5516028d',
        },
        {
          url: '/assets/pwa/manifest-icon-512.maskable.png',
          revision: '9013dd1d45ca14e4b96d2f683c6bf46f',
        },
        { url: '/assets/svg/back_ic.svg', revision: '8211dc462bd66260bcef0c47920d1851' },
        { url: '/assets/svg/edit_color_ic.svg', revision: '802664ef77193383cf018ff9bfa0a57a' },
        { url: '/assets/svg/fab.svg', revision: '6d9fa9a95d35652afe35f2ed1006108b' },
        { url: '/assets/svg/fab_ic.svg', revision: 'd7842ddeed01d990d5c0d857521a1da5' },
        { url: '/assets/svg/fab_open_ic.svg', revision: '7803dfbfb869d741e9e5083de1a3d8fe' },
        { url: '/assets/svg/fab_rotate.svg', revision: 'a65581470a2e769fd4cf4d71a3f769ca' },
        { url: '/assets/svg/hole_ic.svg', revision: 'be4fdccb9e893fffc8afcbf559ff55b4' },
        { url: '/assets/svg/hole_selected_ic.svg', revision: '41276f8a13c4efe3161d951fefafe65e' },
        { url: '/assets/svg/home_init.svg', revision: '6ad4d53c8a9fefcbb41de34c2c539a35' },
        { url: '/assets/svg/home_init_alone.svg', revision: 'fa1b56194a56dc751a16b734d3148db7' },
        { url: '/assets/svg/iCheck.svg', revision: '1a0d3d98f5b93718368a743ea8f180f8' },
        { url: '/assets/svg/iCheckPink.svg', revision: '1477c68c9daab0ac702b4bd0474015a2' },
        { url: '/assets/svg/iClose.svg', revision: '188eb4a86291e5d15c2bb73b718d8eb9' },
        { url: '/assets/svg/iDelete.svg', revision: '80e8276920f62f9a153e0de86840cf56' },
        { url: '/assets/svg/iEdit.svg', revision: '54ccaa4ee792d7ec3a4a8ea87b7d782f' },
        { url: '/assets/svg/iRightArrow.svg', revision: '7d4ed9fa77627401767d44e87e676dce' },
        { url: '/assets/svg/iSelected.svg', revision: '7dcd03b4ab6e2632d762ce5ae18980b3' },
        { url: '/assets/svg/iShowMore.svg', revision: 'cb85e547d0ec147cbba63818b0716d74' },
        { url: '/assets/svg/iSwipeBar.svg', revision: '7ce46109fcda7c64d4cfc7d14d021ef5' },
        { url: '/assets/svg/iTrash.svg', revision: '62c99ed59d12d75e3eefcf3231b0d5d6' },
        { url: '/assets/svg/kakaoLogin.svg', revision: '3d1768b08d31922d3e29ef0b2692935b' },
        { url: '/assets/svg/kebab_ic.svg', revision: '7f80d8b4ac93d8d5ad2852d6cd586b2e' },
        { url: '/assets/svg/loginLogo.svg', revision: '4ac97ea531fbd938010d8f2a13d1c5f4' },
        { url: '/assets/svg/logo.svg', revision: '7c8faabf5c3dfa1e837e5ec33fb9c858' },
        { url: '/assets/svg/member_ic.svg', revision: '5c3549a82db1242eef99de3064307d80' },
        { url: '/assets/svg/plus_ic.svg', revision: '327b44d42399158bad2dfd54030f7a75' },
        { url: '/assets/svg/pmLogo.svg', revision: '5b791acf1df1f31c71fa5cafb1ffafb6' },
        { url: '/assets/svg/profile_ic.svg', revision: 'd895280ef956c5b20ef7701a14756392' },
        { url: '/assets/svg/share_ic.svg', revision: '830dbe6f0a78fb4e9cb003b41c70369d' },
        { url: '/assets/svg/tempBox.svg', revision: 'a1554673b5e07d6ee738740b0270f800' },
        { url: '/assets/svg/template.svg', revision: 'c5320ecae163f39933bf9b1f9912c596' },
        { url: '/favicon.ico', revision: 'c30c7d42707a47a3f4591831641e50dc' },
        { url: '/manifest.json', revision: '47a8b7f2e0a97a2da819c3fc56743ba8' },
        { url: '/vercel.svg', revision: '4b4f1876502eb6721764637fe5c41702' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: i }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    );
});
