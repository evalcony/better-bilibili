// ==UserScript==
// @name         bilibili净化
// @namespace    evalcony
// @version      0.3.0
// @description  bilibili净化脚本，屏蔽各种不需要的页面元素、关键字、直播、广告
// @author       evalcony
// @match        https://*.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// @license      MIT
// @homepageURL  https://github.com/evalcony/better-bilibili
// ==/UserScript==
 (() => {
    'use strict';
    new MutationObserver(() => {
        // 首页 屏蔽词 list
        var blackList = [
            '队友','巅峰','对局','页游','国服','国标','压迫','大仙','破防','好看','好听','打野','逆风','射手','下头','戒','女朋友',
            '上头','尴尬','粉丝','哈哈','手法','逆风','逆境','王者','天花板','高端局','撞车','心理学','战力','新皮肤','年薪','魅惑',
            '国一','啦','阎王','绝望','教官','爸爸','儿子','一整天','消失','偷偷','新皮肤','天秀','对抗路','对线','VLOG','蹲',
            '还手','长寿','冰冰','陈翔','中药','中医','法刺','降维打击','教学局','碾压','火舞','小乔','妲己','安琪拉','折磨','cos','COS',
            '爆表','质疑','洗脚','乱斗','投降','啊啊','vlog','Vlog','有被','燃','惹','指挥','合体','被克','团战','综艺','暴击',
            '观众','大小姐','秀','沙雕','王者','城府','出轨','伴侣','分手','eStar','电竞','游戏区','宝可梦','特种兵','商务本','塔防',
            '反智','老6','虚幻','诗词','李若彤','考研政治','早恋','老婆','内八','冥想','举报','王德峰','张雪峰','李玟','神棍','老天爷','励志',
            '瑞幸','周年庆','口袋妖怪','大镖客','斗破','女团','男朋友','爱情','解说','DOTA','猴子','爱 情','暗黑','网聊','虎狼','妹妹','姐姐',
            '厚礼蟹','种田','结婚','结了婚','读错','恋爱','情商','猫','哭死'
        ];
        // 个人动态页面 屏蔽词 list
        var dynBlackList = [
            '进口','转+评','拼多多','精美','券后','版型','官方店','库存','先拍','预告','治愈','投票','公示','VLOG','好货','实习生',
            '直播','猫咪','党校','转发有奖','巡礼','韦小宝','预约','分享动态','恭喜','中奖','甄别','还有谁','炎热','万粉','手气','封面',
            '即将','泰裤辣','安康','不见不散','分享视频','福利','转发','里程碑','UP主','快乐','按摩','冲牙器','实惠','便宜','豪礼',
            '到手','内裤','好好选','低价','赠品','拍2件','亓','元'
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
            var max_len = 20
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
                                    console.log("屏蔽词:" + blackList[j] + " title=" + title);
                                    flag = true;
                                    break;
                                }
                            }
                            if (flag) {
                                card.remove();
                                break;
                            }
                            // 标题缩减
                            if (title.length > max_len) {
                                links[i].innerHTML = title.substring(0, max_len)
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

        // //删除视频弹幕发送
        //const videoPlayerSendingElement = document.querySelector('div.bpx-player-sending-bar');
        //if (videoPlayerSendingElement) {
            //videoPlayerSendingElement.remove();
        //}

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
            //leftContainerUnderPlayerElement.remove();
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
        //const commentElement = document.querySelector('.comment');
        //if (commentElement) {
            //commentElement.remove();
        //}

        //-------------------------- 动态页面

        // 个人动态
        const biliDynItemsList = document.querySelectorAll('div.bili-dyn-item__main');
        if (biliDynItemsList) {
            biliDynItemsList.forEach(item => {
                // 投票
                var voteElement = item.querySelector('.bili-dyn-card-vote__body')
                if (voteElement) {
                    console.log('屏蔽投票')
                    item.remove();
                    return;
                }

                // 预约
                var reserveElement = item.querySelector('.bili-dyn-card-reserve')
                if (reserveElement) {
                    console.log('屏蔽预约')
                    item.remove();
                    return;
                }

                // 正文
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

        // 右侧话题栏
        const rightElement = document.querySelector('.right');
        if (rightElement) {
            rightElement.remove();
        }


        // --------------- 直播间
        // 直播房间-礼物栏
        const giftControlPanelElement = document.querySelector('.gift-control-panel');
        if (giftControlPanelElement) {
            giftControlPanelElement.remove();
        }

        // 直播房间-视频下方区域
        const sectionBlockElement = document.querySelector('.section-block');
        if (sectionBlockElement) {
            sectionBlockElement.remove();
        }
        // 直播房间-视频上方信息区
        const headInfoLowerRowElement = document.querySelector('.head-info-section .lower-row');
        if (headInfoLowerRowElement) {
            headInfoLowerRowElement.remove();
        }
        // 直播房间-页面底部bilibili公司信息区域
        const linkFooterElement = document.querySelector('#link-footer-vm');
        if (linkFooterElement) {
            linkFooterElement.remove();
        }
        // 直播房间-bilibili娘
        const harunaElement = document.querySelector('.haruna-ctnr');
        if (harunaElement) {
            harunaElement.remove();
        }
        // 直播房间-pk
        const awesomePkBoxElement = document.querySelector('.awesome-pk-box');
        if (awesomePkBoxElement) {
            awesomePkBoxElement.remove();
        }
        // 直播房间-pk
        const pkProcessBoxElement = document.querySelector('.pk-process-box');
        if (pkProcessBoxElement) {
            pkProcessBoxElement.remove();
        }
        // 直播房间-pk结果
        const pkAnimationBoxElement = document.querySelector('.pk-animation-box');
        if (pkAnimationBoxElement) {
            pkAnimationBoxElement.remove();
        }
        // 直播房间-横幅特效
        const announcementElement = document.querySelector('.announcement-wrapper');
        if (announcementElement) {
            announcementElement.remove();
        }
        // 直播房间-弹幕欢迎特效
        const bubbleListElement = document.querySelector('.bubble-list');
        if (bubbleListElement) {
            bubbleListElement.remove();
        }
        // 直播房间-粉丝牌
        const fansMedalItemElement = document.querySelector('.fans-medal-item-ctnr');
        if (fansMedalItemElement) {
            fansMedalItemElement.remove();
        }
        const wealthMedalElement = document.querySelector('.wealth-medal-ctnr');
        if (wealthMedalElement) {
            wealthMedalElement.remove();
        }
        const rankIconElement = document.querySelector('.rank-icon');
        if (rankIconElement) {
            rankIconElement.remove();
        }
        const titleLabelElement = document.querySelector('.title-label');
        if (titleLabelElement) {
            titleLabelElement.remove();
        }
        // 直播房间-舰长列表
        const rankListElement = document.querySelector('#rank-list-ctnr-box');
        if (rankListElement) {
            rankListElement.remove();
        }

    }).observe(document.querySelector('body'), {
        childList: true,
        attributes: true,
        subtree: true,
    });
})();