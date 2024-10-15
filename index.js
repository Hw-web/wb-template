(function () {
  $(() => {
    let filters = [{
      label: "商业",
      value: 1,
      keys: ["BootstrapmadeBusiness"]
    }, {
      label: "个人",
      value: 3,
      keys: ["BootstrapmadePerson"]
    }, {
      label: "建造",
      value: 5,
      keys: ["BootstrapmadeArchitecture"]
    }, {
      label: "教育",
      value: 6,
      keys: ["BootstrapmadeEducation"]
    }, {
      label: "简历",
      value: 8,
      keys: ["BootstrapCurriculumVitae"]
    }, {
      label: "运输",
      value: 10,
      keys: ["BootstrapTransport"]
    }, {
      label: "后台",
      value: 11,
      keys: ["BootstrapAdmin"]
    }, {
      label: "房地产",
      value: 13,
      keys: ["BootstrapEstateAgency"]
    },{
      label: "博客和杂志",
      value: 15,
      keys: ["BootstrapBlog"]
    }, {
      label: "即将推出",
      value: 16,
      keys: ["BootstrapBeAboutStart"]
    }, {
      label: "摄影",
      value: 17,
      keys: ["BootstrapShoot"]
    }, {
      label: "医疗健康",
      value: 18,
      keys: ["BootstrapMedicalTreatment"]
    }, {
      label: "投资组合",
      value: 21,
      keys: ["BootstrapInvest"]
    }, {
      label: "餐厅",
      value: 22,
      keys: ["BootstrapDiningRoom"]
    }]

    filters.forEach(function (item, index) {
      // 创建一个新的 <div> 元素，并设置其内容为数组中的项
      var element = $(
        `<div class="filter-tag ${index == 0 ? 'filter-tag-select' : ''}" data-index="${index}"></div>`
      ).text(item.label);
      // 将新创建的元素添加到页面中的某个容器（例如 #container）
      $(".filter").append(element);
    });


    var data = filters[0].keys.reduce((arr, item) => {
      return arr.concat(window[item])
    }, []);

    var page = 1;

    var loading = false;

    $(".filter").on('click', '.filter-tag', function () {
      var self = this;
      var selfIndex = $(self).attr("data-index");
      if($(self).hasClass("filter-tag-select")) {
        return;
      }
      $(".filter-tag").each(function (item, index) {
       
        $(".filter-tag").eq(item).removeClass().addClass("filter-tag")

        $(self).addClass("filter-tag filter-tag-select");
        data = filters[selfIndex].keys.reduce((arr, key) => {
          return arr.concat(window[key])
        }, []);
        page = 1;
        $(".templates").empty();
        dealData()
      })
    });


    function dealData() {
      var ndata = data.slice((page - 1) * 10, (page - 1) * 10 + 10);
      ndata.forEach(function (item, index) {
        // 创建一个新的 <div> 元素，并设置其内容为数组中的项
        var element = $(`<div class="template">
              <a class="template-href" href="./${item.jumpUrl}" target="blank">
                <img class="template-img" src="./${item.imgUrl}"/>
                <div class="template-right">
                  <div class="template-title">${item.name}</div>
                  <div class="template-introduce">${item.introduce || ''}</div>

                  <div class="template-btn">点击查看</div>
                </div>
                </a>
              </div>`);
        // 将新创建的元素添加到页面中的某个容器（例如 #container）
        $(".templates").append(element);
      });
    }


    dealData();

    // 模拟从服务器加载数据
    function loadMoreContent() {
      var ndata = data.slice((page - 1) * 10, (page - 1) * 10 + 10);
      if (!ndata.length) {
        $('.loading').hide(); // 显示加载动画
        return;
      }
      if (loading) return;
      loading = true;
      $('.loading').show(); // 显示加载动画
      setTimeout(function () { // 模拟异步加载
        page++; // 更新页数
        var ndata = data.slice((page - 1) * 10, (page - 1) * 10 + 10);
        if (!ndata.length) {
          $('.empty-text').show();
          return;
        }
        dealData();
        $('.loading').hide(); // 隐藏加载动画
        loading = false;
      }, 500); // 模拟延迟加载
    }

    // 监听滚动事件
    $(window).scroll(function () {
      if ($(window).scrollTop() + $(window).height() >= $(document).height() - 10) {
        loadMoreContent(); // 当滚动到接近底部时加载更多内容
      }
    });
  })
})()