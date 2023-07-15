// Better Bilibili
// @author       github.com/evalcony
// @match        *://*.bilibili.com/*


//---------------------
(() => {
    'use strict';
    new MutationObserver(() => {
        // black words list
        var blackList = [
            '队友','巅峰','对局','页游','国服','国标','压迫','大仙','破防','好看','好听','打野','逆风','射手','下头','戒','！',
            '上头','尴尬','粉丝','哈哈','手法','逆风','逆境','王者','天花板','高端局','撞车','心理学','战力',"“",'新皮肤',
            '国一','啦','阎王','绝望','教官','爸爸','儿子','一整天','消失','偷偷','新皮肤','天秀','对抗路','对线','VLOG','蹲',
            '还手','长寿','冰冰','陈翔','中药','中医','法刺','降维打击','教学局','碾压','火舞','小乔','妲己','安琪拉','折磨',
            '爆表','质疑','洗脚','乱斗','投降','啊啊','vlog','Vlog','有被','燃','惹','指挥','合体','被克','团战','综艺','暴击',
            '观众','大小姐','秀','沙雕','王者','城府','出轨','伴侣','分手','eStar'
        ];
        // 个人动态页面
        var dynBlackList = [
            '进口','转+评','拼多多','精美','券后','版型','官方店','库存','先拍','预告','治愈','投票','公示','VLOG','好货','实习生',
            '直播','猫咪','党校','转发有奖','巡礼','韦小宝','预约','分享动态','恭喜'
        ];

        // 动态、热门、频道
        const channelIconsElement = document.querySelector('div.channel-icons');
        if (channelIconsElement) {
            channelIconsElement.remove();
        }
        const channelFixedLeftElement = document.querySelector('div.header-channel-fixed-left');
        if (channelFixedLeftElement) {
            channelFixedLeftElement.remove();
        }
        // 导航栏右侧
        const channelRightElement = document.querySelector('a.channel-link__right');
        if (channelRightElement) {
            channelRightElement.remove();
        }
        // 推荐
        const recommendedSwipeElement = document.querySelector('div.recommended-swipe.grid-anchor');
        if (recommendedSwipeElement) {
            recommendedSwipeElement.remove();
        }
        // // grid
        // const videoCardSkeletonElement = document.querySelector('div.bili-video-card__skeleton');
        // if (videoCardSkeletonElement) {
        //     videoCardSkeletonElement.remove();
        // }
        // // grid封面
        // const cardImageElement = document.querySelector('div.bili-video-card__image.__scale-player-wrap');
        // if (cardImageElement) {
        //     cardImageElement.remove();
        // }
        // 直播card
        const floorCardSingleCardElement = document.querySelector('div.floor-card.single-card');
        if (floorCardSingleCardElement) {
            floorCardSingleCardElement.remove();
        }
        // 直播card
        //class="bili-live-card is-rcmd"
        const liveCardElement = document.querySelector('div.bili-live-card');
        if (liveCardElement) {
            liveCardElement.remove();
        }
        // 点赞数量标签
        const videoCardInfoIconTextElement = document.querySelector('div.bili-video-card__info--icon-text');
        if (videoCardInfoIconTextElement) {
            videoCardInfoIconTextElement.remove();
        }
        // 页面滑动板块
        const channelSwiperElement = document.querySelector('div.channel-swiper.channel-swiper-client');
        if (channelSwiperElement) {
            channelSwiperElement.remove();
        }
        // 热门
        const asideWrapElement = document.querySelector('div.aside-wrap');
        if (asideWrapElement) {
            asideWrapElement.remove();
        }

        // 根据屏蔽词过滤grid
        const cardInfoElementList = document.querySelectorAll('div.bili-video-card')
        if (cardInfoElementList) {
            cardInfoElementList.forEach(card => {
                // var links = card.getElementsByTagName('a')
                var videoCardInfoRight = card.querySelector('div.bili-video-card__info--right')
                if (videoCardInfoRight) {
                    var links = videoCardInfoRight.getElementsByTagName('a')
                    if (links) {
                        for (var i = 0; i < links.length; i++) {
                            var title = links[i].textContent || links[i].innerText;
                            var flag = false;
                            for (var j = 0; j < blackList.length; ++j) {
                                if (title.indexOf(blackList[j]) !== -1) {
                                    console.log("包含指定字符串:" + blackList[j] + " title=" + title);
                                    flag = true;
                                    break;
                                }
                            }
                            if (flag) {
                                card.remove();
                                break;
                            }
                            // 标题缩减
                            if (title.length > 15) {
                                links[i].innerHTML = title.substring(0,15)
                            }
                        }
                    }
                }
                // 广告
                var svg = card.querySelector('svg.bili-video-card__info--ad')
                if (svg) {
                    card.remove();
                }

            })
        }


        //--------------------------
        // 删除动态搜索栏的占位文字
        const navSearchInputElement = document.querySelector('input.nav-search-input')
        if (navSearchInputElement) {
            navSearchInputElement.removeAttribute('placeholder');
            navSearchInputElement.removeAttribute('title');
        }
        // 删除搜索历史
        const searchPanelElement = document.querySelector('div.search-panel');
        if (searchPanelElement) {
            searchPanelElement.remove();
        }
        // 菜单栏
        const leftEntryElement = document.querySelector('ul.left-entry');
        if (leftEntryElement) {
            leftEntryElement.remove();
        }
        // 菜单栏右边
        const rightEntryVipElement = document.querySelector('a.right-entry__outside.right-entry--vip');
        if (rightEntryVipElement) {
            rightEntryVipElement.remove();
        }
        const rightEntryMessageElement = document.querySelector('li.v-popover-wrap.right-entry__outside.right-entry--message');
        if (rightEntryMessageElement) {
            rightEntryMessageElement.remove();
        }

        const headerUploadEntryElement = document.querySelector('div.header-upload-entry');
        if (headerUploadEntryElement) {
            headerUploadEntryElement.remove();
        }

        // up头像
        const upAvatarElement = document.querySelector('div.up-avatar-wrap');
        if (upAvatarElement) {
            upAvatarElement.remove();
        }
        // 充电
        const chargeBtnElement = document.querySelector('div.default-btn.new-charge-btn.charge-btn-loaded');
        if (chargeBtnElement) {
            chargeBtnElement.remove();
        }
        // 删除视频弹幕发送
        const videoPlayerSendingElement = document.querySelector('div.bpx-player-sending-bar');
        if (videoPlayerSendingElement) {
            //videoPlayerSendingElement.remove();
        }
        // 投诉
        const videoComplaintElement = document.querySelector('div.video-toolbar-right-item.toolbar-right-complaint');
        if (videoComplaintElement) {
            videoComplaintElement.remove();
        }
        // 笔记
        const videoNoteElement = document.querySelector('div.video-note.video-toolbar-right-item.toolbar-right-note');
        if (videoNoteElement) {
            videoNoteElement.remove();
        }
        // share
        const videoShareBtnElement = document.querySelector('div.video-share-wrap.video-toolbar-left-item');
        if (videoShareBtnElement) {
            videoShareBtnElement.remove();
        }
        // 下方
        const leftContainerUnderPlayerElement = document.querySelector('div.left-container-under-player');
        if (leftContainerUnderPlayerElement) {
            leftContainerUnderPlayerElement.remove();
        }
        //删除视频下方标签
        const tagWrapElement = document.querySelector('div.tag-wrap');
        if (tagWrapElement) {
            tagWrapElement.remove();
        }
        // 广告
        const adReportElement = document.querySelector('div.ad-floor-cover.b-img');
        if (adReportElement) {
            adReportElement.remove();
        }
        // 直播
        const popLivePartElement = document.querySelector('div.pop-live-small-mode.part-undefined');
        if (popLivePartElement) {
            popLivePartElement.remove();
        }
        // 评论区
        const commentElement = document.querySelector('.comment');
        if (commentElement) {
            commentElement.remove();
        }

        //-------------------------- 动态

        // 个人动态
        const biliDynItemsList = document.querySelectorAll('div.bili-dyn-item__main');
        if (biliDynItemsList) {
            biliDynItemsList.forEach(item => {
                var richTextContent = item.querySelector('div.bili-rich-text__content')
                if (richTextContent) {
                    var textElementList = richTextContent.getElementsByTagName('span')
                    if (textElementList) {
                        for (var i = 0; i < textElementList.length; i++) {
                            var text = textElementList[i].textContent || textElementList[i].innerText;
                            var flag = false;
                            for (var j = 0; j < dynBlackList.length; ++j) {
                                if (text.indexOf(dynBlackList[j]) !== -1) {
                                    console.log("包含指定字符串:" + dynBlackList[j]);
                                    flag = true;
                                    break;
                                }
                            }
                            if (flag) {
                                item.remove();
                                break;
                            }
                        }
                    }
                }
            })
        }

    }).observe(document.querySelector('body'), {
        childList: true,
        attributes: true,
        subtree: true,
    });
})();
