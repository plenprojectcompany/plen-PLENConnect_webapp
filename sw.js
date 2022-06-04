const CACHE_VERSION = 'v11';
const CACHE_NAME = `${registration.scope}!${CACHE_VERSION}`;

// キャッシュするファイルをセットする
const urlsToCache = [
  '/',
  '.htaccess',
  'index.html',
  'LICENSE.md',
  'README.md',
  'sw.js',
  'data/bluejelly.js',
  'data/CodeFont.otf',
  'data/CodeFontLight.otf',
  'data/din1451alt_G.ttf',
  'data/MainFont.ttf',
  'data/style.css',
  'data/TitleFont.ttf',
  'data/VarsionFont.ttf',
  'image/icon/apple-touch-icon-180x180.png',
  'image/icon/Error.png',
  'image/icon/favicon.ico',
  'image/icon/Loading.png',
  'image/motion/box/1_10_p_box_shake.png',
  'image/motion/box/2_11_p_box_lift_high.png',
  'image/motion/box/3_12_p_box_lift_low.png',
  'image/motion/box/4_13_p_box_receive.png',
  'image/motion/box/5_14_p_box_holdup.png',
  'image/motion/box/6_15_p_box_give.png',
  'image/motion/box/7_16_p_box_throw.png',
  'image/motion/box/8_17_p_box_takedown_high.png',
  'image/motion/box/9_18_p_box_takedown_low.png',
  'image/motion/dance/1_30_p_dance_rhythm_rstep.png',
  'image/motion/dance/2_31_p_dance_rhythm_onestep.png',
  'image/motion/dance/3_32_p_dance_rhythm_lstep.png',
  'image/motion/dance/4_33_p_dance_kimepose.png',
  'image/motion/dance/5_34_p_dance_kusshin.png',
  'image/motion/dance/6_35_p_dance_wiggle.png',
  'image/motion/dance/7_36_p_dance_rhythm_back.png',
  'image/motion/dance/8_37_p_dance_bow.png',
  'image/motion/dance/9_38_p_dance_twist.png',
  'image/motion/normal/1_00_p_normal_lstep.png',
  'image/motion/normal/2_01_p_normal_fstep .png',
  'image/motion/normal/3_02_p_normal_rstep.png',
  'image/motion/normal/4_03_p_normal_a-hem.png',
  'image/motion/normal/5_04_p_normal_bow.png',
  'image/motion/normal/6_05_p_normal_propose .png',
  'image/motion/normal/7_06_p_normal_hug.png',
  'image/motion/normal/8_07_p_normal_handclap.png',
  'image/motion/normal/9_08_p_normal_hi-five.png',
  'image/motion/others/p_box_back.png',
  'image/motion/others/p_box_forward.png',
  'image/motion/others/p_box_left_biasness.png',
  'image/motion/others/p_box_lturn.png',
  'image/motion/others/p_box_right_biasness.png',
  'image/motion/others/p_box_rturn.png',
  'image/motion/others/p_normal_a-hem.png',
  'image/motion/others/p_normal_bow.png',
  'image/motion/others/p_normal_lturn.png',
  'image/motion/others/p_normal_rturn.png',
  'image/motion/others/p_normal_walk_back.png',
  'image/motion/others/p_normal_walk_foward.png',
  'image/motion/others/p_skate_back.png',
  'image/motion/others/p_skate_chokuritsu.png',
  'image/motion/others/p_skate_forward.png',
  'image/motion/others/p_skate_lturn.png',
  'image/motion/others/p_skate_l_balance.png',
  'image/motion/others/p_skate_l_tsumasaki.png',
  'image/motion/others/p_skate_l_t_balance.png',
  'image/motion/others/p_skate_mae_brake.png',
  'image/motion/others/p_skate_rturn.png',
  'image/motion/others/p_skate_r_balance.png',
  'image/motion/others/p_skate_r_tsumasaki.png',
  'image/motion/others/p_skate_r_t_balance.png',
  'image/motion/others/p_skate_ushiro_brake.png',
  'image/motion/soccer/1_20_p_soccor_defense_lstep.png',
  'image/motion/soccer/2_21_p_soccer_5dash.png',
  'image/motion/soccer/3_22_p_soccor_defense_rstep.png',
  'image/motion/soccer/4_23_p_soccer_l_kick.png',
  'image/motion/soccer/5_24_p_soccor_long_dribble.png',
  'image/motion/soccer/6_25_p_soccer_r_kick.png',
  'image/motion/soccer/7_26_p_soccor_pass_to_left.png',
  'image/motion/soccer/8_27_p_normal_handclap.png',
  'image/motion/soccer/9_28_p_soccor_pass_to_right.png',
  'image/title/startbutton.svg',
  'image/title/subtitlelogo.svg',
  'image/title/titlelogo.svg',
  'js/PLENConnect.js',
  'tools/MotionButtomGenerator.py',
  'tools/ServiseWorkerGenerator.py'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    // キャッシュを開く
    caches.open(CACHE_NAME)
    .then((cache) => {
      // 指定されたファイルをキャッシュに追加する
      return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => {
        // このスコープに所属していて且つCACHE_NAMEではないキャッシュを探す
        return cacheName.startsWith(`${registration.scope}!`) &&
               cacheName !== CACHE_NAME;
      });
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheName) => {
        // いらないキャッシュを削除する
        return caches.delete(cacheName);
      }));
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      // キャッシュ内に該当レスポンスがあれば、それを返す
      if (response) {
        return response;
      }

      // 重要：リクエストを clone する。リクエストは Stream なので
      // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
      // 必要なので、リクエストは clone しないといけない
      let fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            // キャッシュする必要のないタイプのレスポンスならそのまま返す
            return response;
          }

          // 重要：レスポンスを clone する。レスポンスは Stream で
          // ブラウザ用とキャッシュ用の2回必要。なので clone して
          // 2つの Stream があるようにする
          let responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
    })
  );
});