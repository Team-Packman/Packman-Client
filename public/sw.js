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
    const r = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[r]) return;
    let n = {};
    const t = (e) => a(e, r),
      d = { module: { uri: r }, exports: n, require: t };
    s[r] = Promise.all(i.map((e) => d[e] || t(e))).then((e) => (c(...e), n));
  };
}
define(['./workbox-5f5b08d6'], function (e) {
  'use strict';
  importScripts('fallback-q9PI4KzCJlIRFuXmyjwUX.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/static/chunks/20.0dc9a44f082fdc03.js', revision: '0dc9a44f082fdc03' },
        { url: '/_next/static/chunks/274-31d1cdfd0017c58c.js', revision: '31d1cdfd0017c58c' },
        { url: '/_next/static/chunks/279-c5823a3b3e4c1c42.js', revision: 'c5823a3b3e4c1c42' },
        { url: '/_next/static/chunks/308.46d35b1fe1c19317.js', revision: '46d35b1fe1c19317' },
        { url: '/_next/static/chunks/458.f1818ccd725c0780.js', revision: 'f1818ccd725c0780' },
        { url: '/_next/static/chunks/462.ec64b65f6e0ff524.js', revision: 'ec64b65f6e0ff524' },
        { url: '/_next/static/chunks/492.fd4b42a9c1d3d187.js', revision: 'fd4b42a9c1d3d187' },
        { url: '/_next/static/chunks/494-f7f326cc2e391caf.js', revision: 'f7f326cc2e391caf' },
        { url: '/_next/static/chunks/505.863a01926321f573.js', revision: '863a01926321f573' },
        { url: '/_next/static/chunks/540.8276ea7542a7a93f.js', revision: '8276ea7542a7a93f' },
        { url: '/_next/static/chunks/651.bd3ee586694c39ed.js', revision: 'bd3ee586694c39ed' },
        { url: '/_next/static/chunks/977-81ad82cc15ec0bd8.js', revision: '81ad82cc15ec0bd8' },
        { url: '/_next/static/chunks/framework-4556c45dd113b893.js', revision: '4556c45dd113b893' },
        { url: '/_next/static/chunks/main-4d95ae84c389f089.js', revision: '4d95ae84c389f089' },
        { url: '/_next/static/chunks/pages/500-9e2510c62b1b3cb9.js', revision: '9e2510c62b1b3cb9' },
        {
          url: '/_next/static/chunks/pages/_app-2aab1234f779fabf.js',
          revision: '2aab1234f779fabf',
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
          url: '/_next/static/chunks/pages/alone-007fd76b8496160c.js',
          revision: '007fd76b8496160c',
        },
        {
          url: '/_next/static/chunks/pages/alone/invited-457040ffe8739605.js',
          revision: '457040ffe8739605',
        },
        {
          url: '/_next/static/chunks/pages/alone/shared-591941ce73bf9812.js',
          revision: '591941ce73bf9812',
        },
        {
          url: '/_next/static/chunks/pages/edit-profile-ec185e4e08b35c50.js',
          revision: 'ec185e4e08b35c50',
        },
        {
          url: '/_next/static/chunks/pages/folder-58f7b53e63723005.js',
          revision: '58f7b53e63723005',
        },
        {
          url: '/_next/static/chunks/pages/list-intro-9bae701d57f079c9.js',
          revision: '9bae701d57f079c9',
        },
        {
          url: '/_next/static/chunks/pages/login-4240797a565df1c4.js',
          revision: '4240797a565df1c4',
        },
        {
          url: '/_next/static/chunks/pages/manage-81ead136e2eb072a.js',
          revision: '81ead136e2eb072a',
        },
        {
          url: '/_next/static/chunks/pages/packing-list-b40dc6f47b0b4f5d.js',
          revision: 'b40dc6f47b0b4f5d',
        },
        {
          url: '/_next/static/chunks/pages/preview-de9b104daa5ff11c.js',
          revision: 'de9b104daa5ff11c',
        },
        {
          url: '/_next/static/chunks/pages/profile-77d329d48b91221c.js',
          revision: '77d329d48b91221c',
        },
        {
          url: '/_next/static/chunks/pages/select-template-162fe125f4a99a90.js',
          revision: '162fe125f4a99a90',
        },
        {
          url: '/_next/static/chunks/pages/together-fc307b7ff83c4a16.js',
          revision: 'fc307b7ff83c4a16',
        },
        {
          url: '/_next/static/chunks/pages/together/invited-26a10ef39b2f837c.js',
          revision: '26a10ef39b2f837c',
        },
        {
          url: '/_next/static/chunks/polyfills-0d1b80a048d4787e.js',
          revision: '40ccea369337cec877151c906f22814d',
        },
        { url: '/_next/static/chunks/webpack-7f2e6d7d3c3cf4ee.js', revision: '7f2e6d7d3c3cf4ee' },
        { url: '/_next/static/css/250ff86455070da4.css', revision: '250ff86455070da4' },
        { url: '/_next/static/css/af16e0fa0c206764.css', revision: 'af16e0fa0c206764' },
        {
          url: '/_next/static/media/ErrorImage.8a051702.webp',
          revision: 'bca353c4aa6584290a00428ee0e6e477',
        },
        {
          url: '/_next/static/media/back_ic.118a0e08.svg',
          revision: '8211dc462bd66260bcef0c47920d1851',
        },
        {
          url: '/_next/static/media/concert.3a53fad6.webp',
          revision: 'd8fb6b8c56cc3c20aaafef131c30246f',
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
          url: '/_next/static/media/forShare.94ef7e90.webp',
          revision: 'f238e9cd75d0dfb8a73d41e88211da16',
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
          url: '/_next/static/media/home_alone.8e77d9a9.webp',
          revision: '0a8140ca78b7383629eca7db7b3f3279',
        },
        {
          url: '/_next/static/media/home_ic.13267e27.svg',
          revision: 'd6585bffb32b79f67a6ba27dacec77e8',
        },
        {
          url: '/_next/static/media/home_together.ac09113b.webp',
          revision: '8369442f6c64532ed895050c99ff2b07',
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
          url: '/_next/static/media/jeju.bf87b411.webp',
          revision: '478ef6884a031bac93f04c8b6dec164c',
        },
        {
          url: '/_next/static/media/kakaoLogin.c80e503d.webp',
          revision: 'cc64aa28b113a8d0bd22625bf458cdd0',
        },
        {
          url: '/_next/static/media/kebab_ic.0a8c49ae.svg',
          revision: '7f80d8b4ac93d8d5ad2852d6cd586b2e',
        },
        {
          url: '/_next/static/media/korea_travel.c666729d.webp',
          revision: '9e13d473d33d6b8fbe6a3c7173a396ff',
        },
        {
          url: '/_next/static/media/loginLogo.810ce5f2.webp',
          revision: 'ca41db05e4af928ea3e651a492c49b51',
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
          url: '/_next/static/media/oversea_travel.6cf472db.webp',
          revision: '35edd86b18dfadfeefb98b920637d698',
        },
        {
          url: '/_next/static/media/pet.35c271dd.webp',
          revision: '2a3c10473ee48c28c92292826ace35f5',
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
          url: '/_next/static/media/profile1.f7e21732.webp',
          revision: '6f58297ef8c0b8a5c8d088aa2a2e5f9d',
        },
        {
          url: '/_next/static/media/profile2.de1103ec.webp',
          revision: '1a6ab85c312f218c4ae7b0f0f57e1cf7',
        },
        {
          url: '/_next/static/media/profile3.7f77ad43.webp',
          revision: '144dad294c2accf720f6d795641afc55',
        },
        {
          url: '/_next/static/media/profile4.33a5ec52.webp',
          revision: '30589c724676a9444fa2972625d98226',
        },
        {
          url: '/_next/static/media/profile5.ec6945d1.webp',
          revision: 'ef0054b7e12eac07aa97dcf00eea4ac8',
        },
        {
          url: '/_next/static/media/profile6.e259b15d.webp',
          revision: 'bfd466e83a910ae77769058ccb2c6182',
        },
        {
          url: '/_next/static/media/profile_ic.044159bf.svg',
          revision: 'd895280ef956c5b20ef7701a14756392',
        },
        {
          url: '/_next/static/media/random1.159924f6.webp',
          revision: 'd89c97ebe88756c42023cc77ffb99cc7',
        },
        {
          url: '/_next/static/media/random2.4ffa3180.webp',
          revision: 'd1b86436b279c97c6f1cacdf9e9f832c',
        },
        {
          url: '/_next/static/media/random3.84cb5464.webp',
          revision: 'f663aa5d7d8662f27da40b094259788c',
        },
        {
          url: '/_next/static/media/random4.4febbecb.webp',
          revision: '90291574e235c57f7d7f9b6739687544',
        },
        {
          url: '/_next/static/media/share_ic.1ec9eeb5.svg',
          revision: '830dbe6f0a78fb4e9cb003b41c70369d',
        },
        {
          url: '/_next/static/media/toeic.c7abe5fd.webp',
          revision: '3aeed1ddcccccb3dd88dfa8350ac1102',
        },
        {
          url: '/_next/static/q9PI4KzCJlIRFuXmyjwUX/_buildManifest.js',
          revision: '40c3c05444910a0c9bee064ea84b777f',
        },
        {
          url: '/_next/static/q9PI4KzCJlIRFuXmyjwUX/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_offline', revision: 'q9PI4KzCJlIRFuXmyjwUX' },
        { url: '/assets/index.ts', revision: '841bba549d561f0cbabda55b6205c0ff' },
        { url: '/assets/lottie/loading.json', revision: '850c0691f398b26d4bce9e393eed47c9' },
        { url: '/assets/png/ErrorImage.webp', revision: 'bca353c4aa6584290a00428ee0e6e477' },
        { url: '/assets/png/concert.webp', revision: 'd8fb6b8c56cc3c20aaafef131c30246f' },
        { url: '/assets/png/crown.png', revision: '25bf6e36af516df6bff88a5be40ca354' },
        { url: '/assets/png/editButton.png', revision: '6699284b47b94de4257a6f4b724b5c7b' },
        { url: '/assets/png/forShare.webp', revision: 'f238e9cd75d0dfb8a73d41e88211da16' },
        { url: '/assets/png/home_alone.webp', revision: '0a8140ca78b7383629eca7db7b3f3279' },
        { url: '/assets/png/home_together.webp', revision: '8369442f6c64532ed895050c99ff2b07' },
        { url: '/assets/png/jeju.webp', revision: '478ef6884a031bac93f04c8b6dec164c' },
        { url: '/assets/png/kakaoLogin.webp', revision: 'cc64aa28b113a8d0bd22625bf458cdd0' },
        { url: '/assets/png/korea_travel.webp', revision: '9e13d473d33d6b8fbe6a3c7173a396ff' },
        { url: '/assets/png/loginLogo.webp', revision: 'ca41db05e4af928ea3e651a492c49b51' },
        { url: '/assets/png/oversea_travel.webp', revision: '35edd86b18dfadfeefb98b920637d698' },
        { url: '/assets/png/pet.webp', revision: '2a3c10473ee48c28c92292826ace35f5' },
        { url: '/assets/png/profile1.webp', revision: '6f58297ef8c0b8a5c8d088aa2a2e5f9d' },
        { url: '/assets/png/profile2.webp', revision: '1a6ab85c312f218c4ae7b0f0f57e1cf7' },
        { url: '/assets/png/profile3.webp', revision: '144dad294c2accf720f6d795641afc55' },
        { url: '/assets/png/profile4.webp', revision: '30589c724676a9444fa2972625d98226' },
        { url: '/assets/png/profile5.webp', revision: 'ef0054b7e12eac07aa97dcf00eea4ac8' },
        { url: '/assets/png/profile6.webp', revision: 'bfd466e83a910ae77769058ccb2c6182' },
        { url: '/assets/png/random1.webp', revision: 'd89c97ebe88756c42023cc77ffb99cc7' },
        { url: '/assets/png/random2.webp', revision: 'd1b86436b279c97c6f1cacdf9e9f832c' },
        { url: '/assets/png/random3.webp', revision: 'f663aa5d7d8662f27da40b094259788c' },
        { url: '/assets/png/random4.webp', revision: '90291574e235c57f7d7f9b6739687544' },
        { url: '/assets/png/removeMember.png', revision: '650803b23931b50ad6fdc4834f39433e' },
        { url: '/assets/png/toeic.webp', revision: '3aeed1ddcccccb3dd88dfa8350ac1102' },
        { url: '/assets/pwa/apple-icon-180.png', revision: 'fcf0de47676b5dc91a85f58c69574526' },
        {
          url: '/assets/pwa/apple-splash-1125-2436.jpg',
          revision: '27e9236e6cff5ebbb51f3276ca0e8560',
        },
        {
          url: '/assets/pwa/apple-splash-1136-640.jpg',
          revision: '67322220474e05dfae4c7aeea05439bd',
        },
        {
          url: '/assets/pwa/apple-splash-1170-2532.jpg',
          revision: '255c08184cb9613296686dc01e527531',
        },
        {
          url: '/assets/pwa/apple-splash-1242-2208.jpg',
          revision: '7c8cc36e6232b6a457a8375184b7a171',
        },
        {
          url: '/assets/pwa/apple-splash-1242-2688.jpg',
          revision: '8dc424c3be7d5d573cf70cb5ed709c30',
        },
        {
          url: '/assets/pwa/apple-splash-1284-2778.jpg',
          revision: '78fe7920dcd5fc48c4ec5eb7506b5ed5',
        },
        {
          url: '/assets/pwa/apple-splash-1334-750.jpg',
          revision: '22ee2d6b8756252f334850db02a680ff',
        },
        {
          url: '/assets/pwa/apple-splash-1536-2048.jpg',
          revision: '189b4655718523532a23b065d298d2e2',
        },
        {
          url: '/assets/pwa/apple-splash-1620-2160.jpg',
          revision: '0ba2c407de40fd1bc754224473bba89f',
        },
        {
          url: '/assets/pwa/apple-splash-1668-2224.jpg',
          revision: '7a1e5a8933fdeec00f15be787430c825',
        },
        {
          url: '/assets/pwa/apple-splash-1668-2388.jpg',
          revision: '7d41589238fdb5d36d0896723fb4178d',
        },
        {
          url: '/assets/pwa/apple-splash-1792-828.jpg',
          revision: '5ebcf0af16861b86dbc61758543070fe',
        },
        {
          url: '/assets/pwa/apple-splash-2048-1536.jpg',
          revision: '19baa765dd66f259e065e0a81ca8ec86',
        },
        {
          url: '/assets/pwa/apple-splash-2048-2732.jpg',
          revision: '0ab482f2f1160f6b17f7417e615262f6',
        },
        {
          url: '/assets/pwa/apple-splash-2160-1620.jpg',
          revision: 'd00033860352633aaf653ca1d0038b83',
        },
        {
          url: '/assets/pwa/apple-splash-2208-1242.jpg',
          revision: '423624722de6e2788a1da333bc33ad56',
        },
        {
          url: '/assets/pwa/apple-splash-2224-1668.jpg',
          revision: '60c3e003b5e5ef30fbc19acc1a43d9bf',
        },
        {
          url: '/assets/pwa/apple-splash-2388-1668.jpg',
          revision: '1b68844f9888c6cc89104a028d8166dd',
        },
        {
          url: '/assets/pwa/apple-splash-2436-1125.jpg',
          revision: '9304133e8afce9ca90b154eb35d6efb9',
        },
        {
          url: '/assets/pwa/apple-splash-2532-1170.jpg',
          revision: '14669427615cd796d2211071863ec844',
        },
        {
          url: '/assets/pwa/apple-splash-2688-1242.jpg',
          revision: '34302e1a6356fdc09f7197d3956ef676',
        },
        {
          url: '/assets/pwa/apple-splash-2732-2048.jpg',
          revision: 'a8c7fbc6f3539dc516df98f973a8e8da',
        },
        {
          url: '/assets/pwa/apple-splash-2778-1284.jpg',
          revision: 'dde9fb5990cb7cbd12a8763a7c7a3c02',
        },
        {
          url: '/assets/pwa/apple-splash-640-1136.jpg',
          revision: '17fd4d9d68d0cdb84508c4cf1fc0585c',
        },
        {
          url: '/assets/pwa/apple-splash-750-1334.jpg',
          revision: '03ed4c93ce61829676629ced66eaa885',
        },
        {
          url: '/assets/pwa/apple-splash-828-1792.jpg',
          revision: '5372842296a947219daef1db1d8bb41e',
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
        { url: '/assets/svg/home_ic.svg', revision: 'd6585bffb32b79f67a6ba27dacec77e8' },
        { url: '/assets/svg/home_init.svg', revision: '6ad4d53c8a9fefcbb41de34c2c539a35' },
        { url: '/assets/svg/home_init_alone.svg', revision: 'fa1b56194a56dc751a16b734d3148db7' },
        { url: '/assets/svg/iCheck.svg', revision: '1a0d3d98f5b93718368a743ea8f180f8' },
        { url: '/assets/svg/iCheckPink.svg', revision: '1477c68c9daab0ac702b4bd0474015a2' },
        { url: '/assets/svg/iClose.svg', revision: '188eb4a86291e5d15c2bb73b718d8eb9' },
        { url: '/assets/svg/iEdit.svg', revision: '54ccaa4ee792d7ec3a4a8ea87b7d782f' },
        { url: '/assets/svg/iRightArrow.svg', revision: '7d4ed9fa77627401767d44e87e676dce' },
        { url: '/assets/svg/iSelected.svg', revision: '7dcd03b4ab6e2632d762ce5ae18980b3' },
        { url: '/assets/svg/iShowMore.svg', revision: 'cb85e547d0ec147cbba63818b0716d74' },
        { url: '/assets/svg/iSwipeBar.svg', revision: '7ce46109fcda7c64d4cfc7d14d021ef5' },
        { url: '/assets/svg/iTrash.svg', revision: '62c99ed59d12d75e3eefcf3231b0d5d6' },
        { url: '/assets/svg/kebab_ic.svg', revision: '7f80d8b4ac93d8d5ad2852d6cd586b2e' },
        { url: '/assets/svg/logo.svg', revision: '7c8faabf5c3dfa1e837e5ec33fb9c858' },
        { url: '/assets/svg/member_ic.svg', revision: '5c3549a82db1242eef99de3064307d80' },
        { url: '/assets/svg/plus_ic.svg', revision: '327b44d42399158bad2dfd54030f7a75' },
        { url: '/assets/svg/pmLogo.svg', revision: '5b791acf1df1f31c71fa5cafb1ffafb6' },
        { url: '/assets/svg/profile_ic.svg', revision: 'd895280ef956c5b20ef7701a14756392' },
        { url: '/assets/svg/share_ic.svg', revision: '830dbe6f0a78fb4e9cb003b41c70369d' },
        { url: '/favicon.ico', revision: 'e83639af84e98a90a16e79e094e2836a' },
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
