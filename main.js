// ==UserScript==
// @name         bilibili净化
// @namespace    evalcony
// @version      0.4.4
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
            '对局','页游','国服','国标','压迫','大仙','破防','好看','好听','打野','逆风','射手','下头','戒','女朋友',
            '上头','尴尬','粉丝','哈哈','手法','逆风','逆境','天花板','高端局','撞车','心理学','战力','新皮肤','年薪','魅惑',
            '国一','啦','阎王','绝望','教官','爸爸','儿子','一整天','消失','偷偷','新皮肤','天秀','对抗路','VLOG','蹲',
            '还手','长寿','冰冰','陈翔','中药','中医','法刺','降维打击','教学局','碾压','火舞','小乔','妲己','安琪拉','折磨','cos','COS',
            '爆表','质疑','洗脚','乱斗','投降','啊啊','vlog','Vlog','有被','惹','指挥','合体','被克','团战','暴击',
            '观众','大小姐','沙雕','城府','出轨','伴侣','eStar','电竞','游戏区','特种兵','商务本','塔防','沈腾','贾玲','王自如','太刀',
            '反智','老6','诗词','李若彤','考研政治','早恋','老婆','内八','冥想','举报','王德峰','张雪峰','李玟','神棍','老天爷','励志',
            '瑞幸','周年庆','大镖客','斗破','女团','男朋友','爱情','DOTA','猴子','爱 情','暗黑','网聊','虎狼','妹妹','姐姐',
            '厚礼蟹','种田','结婚','结了婚','读错','恋爱','情商','哭死','党政','炸裂','劳斯莱斯','cp','CP','心巴','怀孕','贩','骂','讨厌',
            '摆烂','退游','猪队友','王者荣耀','这把','土豆','厨房','三倍快乐','卖萌','盲盒','哇塞','哇噻','迷倒','迷不倒','穿搭','妖刀','裙',
            '扭断','蛮腰','少妇','嘿丝','怨妇','科目三','钓系','喵咪','舔狗','裸眼','初 恋','每 天 一 遍','吃苦熬夜','大病','女秘书','不会原谅',
            '天生就是主角','热辣','活力','全开麦','女神','❤️','相亲','超甜','射中你的心','都在想你','女 仆','随机挑战','疯狂心动','roly poly',
            '已婚之后','我可就不困了','骨 盆 舞','老公','按摩','娇滴滴','背着男朋友','下播','封面','烂片','思春期','脸红','谁TM','纯 欲','纯欲',
            '校花','康康','抵抗姐姐','宝宝','大姐姐','御姐','甜心','仙女','袜子','舞蹈','炸裂','连体衣','短发','撩你','治好了','炸鸡','蹦迪',
            '蹦个迪','失眠','因为想你','大摆锤','大 摆 锤','限定皮肤','新三国','吃席','国企','香甜可口','哒哒哒','瞧不起','恶搞','鬼畜',
            '我家猫','红警','嬛','消费观','春晚','心动女生','过膝袜','网贷','蓝色战衣','亲戚','跳舞','⚡️','漫展','闺蜜','怪物猎人','进击的',
            '年夜饭','徐静雨','大龄剩','卧槽','阿姨','婚礼','社死','斗地主','不可以拒绝','OL制服','心动','舞','渣 女','渣女','渣男','渣 男','♥',
            '谁懂'
        ];
        // 个人动态页面 屏蔽词 list
        var dynBlackList = [
            '进口','转+评','拼多多','精美','券后','版型','官方店','库存','先拍','预告','治愈','投票','公示','VLOG','好货','实习生',
            '直播','猫咪','党校','转发有奖','巡礼','韦小宝','预约','分享动态','恭喜','中奖','甄别','还有谁','炎热','万粉','手气','封面',
            '即将','泰裤辣','安康','不见不散','分享视频','福利','转发','里程碑','UP主','快乐','按摩','冲牙器','实惠','便宜','豪礼',
            '到手','内裤','好好选','低价','赠品','拍2件','亓','元','晚安','国服','感谢','赞助','转评','送','特价','款式','转发+关注',
            '开奖','消费券','红包','抽奖','拿来吧','售价','开箱','划算','店铺'
        ];

        // ---------------------------------------------------------- 分割线 -----------------------------------------------------------------

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
        // 直播card 带有直播标签的视频
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
            //leftEntryElement.remove();
        }
        // 右边菜单栏
        const rightEntryVipElement = document.querySelector('a.right-entry__outside.right-entry--vip');
        if (rightEntryVipElement) {
            rightEntryVipElement.remove();
        }
        // 右边菜单栏-个人消息
        const rightEntryMessageElement = document.querySelector('li.v-popover-wrap.right-entry__outside.right-entry--message');
        if (rightEntryMessageElement) {
            //rightEntryMessageElement.remove();
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

        //删除视频弹幕发送
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
        const commentElement = document.querySelector('.comment');
        if (commentElement) {
            //commentElement.remove();
        }

        // 右侧广告
        const slideAdElement = document.querySelector('.slide_ad');
        if (slideAdElement) {
            slideAdElement.remove();
        }

        // 右侧直播推荐
        const popLiveSmallModeElement = document.querySelector('.pop-live-small-mode');
        if (popLiveSmallModeElement) {
            popLiveSmallModeElement.remove();
        }

        // 说明：bibili 这里做了关联，屏蔽了推荐列表，会导致选集列表数据无法展示，所以要屏蔽就都屏蔽
        // 这里改动这里的 false / true 即可
        // false: 不屏蔽
        // true: 屏蔽
        // 推荐设置为 false。
        if (false) {
            // 右侧视频选集列表
            const videoPageCardElement = document.querySelector('#multi_page');
            if (videoPageCardElement) {
                videoPageCardElement.remove();
            }
            // 右侧视频推荐列表
            const recommendListElement = document.querySelector('.recommend-list-v1');
            if (recommendListElement) {
                recommendListElement.remove();
            }
        }

        // 视频播放中出现的问题面板
        const bpxPlayerCmdDmElement = document.querySelector('.bpx-player-cmd-dm-inside');
        if (bpxPlayerCmdDmElement) {
            bpxPlayerCmdDmElement.remove();
        }


        //-------------------------- 动态

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

                // 转发、评论、点赞
                var itemFooterElement = item.querySelector('.bili-dyn-item__footer')
                if (itemFooterElement) {
                    //itemFooterElement.remove();
                    return;
                }
            })
        }

        // 右侧话题栏
        const stickyElement = document.querySelector('.sticky');
        if (stickyElement) {
            stickyElement.remove();
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
        // 直播房间-小游戏
        const gameElement = document.querySelector('#game-id');
        if (gameElement) {
            gameElement.remove();
        }

    }).observe(document.querySelector('body'), {
        childList: true,
        attributes: true,
        subtree: true,
    });
})();