var Xinfud = {};

Xinfud.CONFIG = {

  MESSAGE: {
    network_error: '网络异常，请稍后尝试！'
  }

};

// 公共方法对象
Xinfud.Common = {};

// 禁止图片拖动
Xinfud.Common.noDrag = function() {
  // 禁止图片拖动
  var imgEl = document.images;
  for (var i in imgEl) {
    imgEl[i].ondragstart = function() {
      return false;
    }
  }
}();

/**
 *初始化首页轮播
 * @return {[type]} [description]
 */
Xinfud.initSwiper = function() {

  var prevBtn = $('#prev');
  var nextBtn = $('#next');
  var slideEl = $('.banner-index ul li');
  var paginationEl = $('.banner-index ol');

  var time = null;
  var duration = 5000;
  var iNow = iNow || 0;
  var iLen = slideEl.length - 1;
  var fadeInState = false;

  var play = function(index) {
    if (!fadeInState) {
      fadeInState = true;
      clearInterval(time);
      slideEl.eq(index).css('z-index', 2).fadeIn(function() {
        $(this).css('z-index', 1).siblings('li').hide();
        fadeInState = false;
      });
      changePagination();
      autoPlay();
    }
  }

  var autoPlay = function() {
    clearInterval(time);
    time = setInterval(function() {
      iNow = ++iNow > iLen ? 0 : iNow;
      play(iNow)
    }, duration);
  };

  var initPagination = function() {
    var len = slideEl.length;
    for (var i = 1; i < len + 1; i++) {
      paginationEl.append('<li data-sign="' + i + '"></li>')
    }
    changePagination();

    paginationEl.find('li').on('click', function() {
      iNow = $(this).attr('data-sign') - 1;
      play(iNow);
    });
  };

  var changePagination = function() {
    paginationEl.find('li').each(function() {
      $(this).attr('class', '');
    }).eq(iNow).attr('class', 'active');
  };

  prevBtn.on('click', function() {
    iNow = --iNow < 0 ? 1 : iNow;
    play(iNow);
  })

  nextBtn.on('click', function() {
    iNow = ++iNow > iLen ? 0 : iNow;
    play(iNow);
  });

  autoPlay();
  initPagination();

};

// 行业动态页面对象
Xinfud.NewsList = {};

/**
 控制回到顶部按钮显示
 */
Xinfud.NewsList.backTop = function() {

  // DOM变量
  var
    backtopEl = $('.backtop'),
    footerEl = document.getElementById('footer'),
    contentEl = document.getElementById('content');

  // 状态缓存
  var
    isAnimate = false,
    isFixBottom = true,
    isHidden = true;

  // 高度缓存
  var
    seeHeight = document.documentElement.clientHeight,
    footerHeight = footerEl.offsetTop,
    contentHeight = contentEl.offsetTop,
    heightLow = 0;

  // 控制回到顶部按钮显示和加载更多按钮
  window.onscroll = function() {

    // 缓存高度值
    var
      footerHeightTmp = footerEl.offsetTop,
      scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
      height = seeHeight + scrollTop;

    // 获取页脚高度
    footerHeight !== footerHeightTmp ? footerHeight = footerHeightTmp : 0;

    // 根据文章内容判断显示回到顶部按钮
    if (scrollTop > contentHeight) {
      if (isHidden) {
        backtopEl.fadeIn();
        isHidden = false;
      }
    } else if (!isHidden) {
      backtopEl.fadeOut();
      isHidden = true;
    }

    // 设置回到顶部按钮的位置
    if (height > footerHeight) {
      heightLow = height - footerHeight + 30;
      backtopEl.css('bottom', heightLow + 'px');
      isFixBottom = false;
    } else if (!isFixBottom) {
      backtopEl.css('bottom', '30px');
      isFixBottom = true;
    }

  }

  // 绑定监听事件
  backtopEl.on('click', function() {
    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
      window.scrollTo(0, 0);
      return;
    }
    if (!isAnimate) {
      $('body').animate({ scrollTop: '0px' }, 800, function() {
        isAnimate = false;
      });
    }
  });

}
