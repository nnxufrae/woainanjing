<template>
    <div class="mainpage">
       <van-search
        v-model="searchdata"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <!-- 轮播图 -->
        <div class="imgMap">
            <van-swipe :autoplay="6000" :height="100" :width="345" indicator-color="red">
                <van-swipe-item class="imgMap_model"><img src="../../assets/img/lizhi1.png" alt=""></van-swipe-item>
                <van-swipe-item class="imgMap_model"><img src="../../assets/img/lizhi2.png" alt=""></van-swipe-item>
                <van-swipe-item class="imgMap_model"><img src="../../assets/img/lizhi3.png" alt=""></van-swipe-item>
                <van-swipe-item class="imgMap_model"><img src="../../assets/img/lizhi4.png" alt=""></van-swipe-item>
                <van-swipe-item class="imgMap_model"><img src="../../assets/img/lizhi5.png" alt=""></van-swipe-item>
                <van-swipe-item class="imgMap_model"><img src="../../assets/img/lizhi7.png" alt=""></van-swipe-item>
            </van-swipe>
        </div>
        <!-- 私人推荐 -->
        <div class="PrivateRecommend">
             <div class="RecommendInit">
                 <div class="RecommendIcon">
                   <van-icon size="20px" name="audio" color="white"/>
                 </div>
                 <div class="RecommendName">
                    每日推荐
                 </div>
             </div>
             <div class="RecommendInit">
                 <div class="RecommendIcon">
                   <van-icon size="20px" name="invition" color="white"/>
                 </div>
                 <div class="RecommendName">
                    歌单
                 </div>
             </div>
             <div class="RecommendInit">
                 <div class="RecommendIcon">
                   <van-icon size="20px" name="hot" color="white"/>
                 </div>
                 <div class="RecommendName">
                    排行榜
                 </div>
             </div>
        </div>
        <!-- 歌单广场 -->
        <div class="songSheet">
            <div class="songSheetTitle">
                歌单广场
            </div>
            <div class="sheetList">
                <div class="songsheetinit" v-for="(i,index) in allmuisc" :key="index" @click="songlistm(i,index)">
                    <div class="songsheetImg">
                        <img :src="'http://senyepai.com/lizhi/images/'+index+'.jpg'" alt="">
                    </div>
                    <div class="songsheetName">
                        {{i.album}}
                    </div>
                </div>
            </div>
        </div>
        <!-- 播放模块 -->
        <div class="playmodel">
             <div class="musicImg" @click="openplaypon">
                 <img src="http://senyepai.com/lizhi/images/1.jpg" alt="">
             </div>
             <div class="musicprogress" >
                    <van-progress
                    
                    pivot-text=""
                    color="#f44"
                    :percentage="playlineLength"
                    />
             </div>
             <audio :src="musicUrl" id="myaudio" hidden="true">
             </audio>
             <div class="palybtn" >
                 <van-icon name="play" @click="changeplaystate" v-if="playbtnflag" size="20px"/>
                 <van-icon name="pause" @click="puash" v-if="!playbtnflag" size="20px"/>
             </div>
        </div>
        <!-- 歌单列表弹层 -->
        <div class="songlistpopon" v-show="songListshow">
        <van-nav-bar
        title="歌单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="songlistingfo">
            <div class="songlistimg">
                <img :src="'http://senyepai.com/lizhi/images/'+nowindex+'.jpg'" alt="">
            </div>
            <div class="sonlisttitle">
                {{nowgedan.album}}
            </div>
        </div>
        <div class="nowsonglist">
            
            <van-panel v-for="(i,index) in nowgedan.music" :key="index" :title="i" :desc="nowgedan.album" status="播放">
            </van-panel>
        </div>
        </div>

        <!-- 播放器弹层 -->
        <div class="musicplaypopon" v-show="musicplay">
             <van-nav-bar
                title="标题"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft1"
            />
            <div class="playmusicimg" id="cover" style="transform: rotate(0deg); transform-origin: 50% 50%;">
                <img :src="'http://senyepai.com/lizhi/images/'+nowindex+'.jpg'" alt="">
            </div>
            <div class="playbtnlist">
                <div class="playtimeinit">
                    <div class="playtimeInit">
                        {{palytime}}
                        <span v-show="palytime == 0">00:00</span>
                    </div>
                    <div class="jindutiao">
                    <van-slider v-model="bofangchangdu" bar-height="4px" active-color="#f44" disabled />
                    </div>
                    <div class="playtimeInit">
                        {{musicTime}}
                    </div>
                </div>
                
                <div class="btninit">
                    <div class="btninti1 mtop"></div>
                    <div class="btninit2 mstart" @click="changeplaystate" v-if="playbtnflag" ></div>
                    <div class="btninit2 mstop" @click="puash" v-if="!playbtnflag" ></div>
                    <div class="btninti1 mnext" @click="nextone()"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var audio;
    export default {
        name:'main_page',
        data() {
            return {
                musicplay:false,
                songListshow:false,
                playlineLength:0,//播放进度条长度
                bofangchangdu:0,
                playbtnflag:true,
                searchdata: '',
                imageURL:'',
                nowgedan:{},
                nowindex:0,
                musicUrl:'../../../static/反光镜 - 只有音乐才是我的解药.mp3',
                musicpath:'',
                allmusicpath:'',
                musicTime:'',
                allmuisc:[{
                            "album": "被禁忌的游戏(2004)", "music": [
                                "01黑色信封.mp3      ",
                                "02青春.mp3               ",
                                "03阿兰.mp3      ",
                                "04离婚.mp3               ",
                                "05欢愉.mp3      ",
                                "06卡夫卡.mp3               ",
                                "07被禁忌的游戏.mp3      ",
                                "08罗庄的冬天.mp3               ",
                                "09红色气球.mp3               "
                                ]
                            },{
                            "album": "梵高先生(2005)", "music": [
                                "01你离开了南京，从此没有人和我说话.mp3      ",
                                "02董卓瑶.mp3               ",
                                "03春末的南方城市.mp3      ",
                                "04广场.mp3               ",
                                "05来了.mp3      ",
                                "06暧昧.mp3               ",
                                "07想起了他.mp3      ",
                                "08梵高先生.mp3               ",
                                "09斜.mp3               "
                            ]
                        },
                            {
                                "album": "这个世界会好吗(2006)", "music": [
                                "01妈妈.mp3      ",
                                "02喀纳斯.mp3               ",
                                "03和你在一起.mp3      ",
                                "04我们不能失去信仰——献给刘艺.mp3               ",
                                "05翁庆年的六英镑.mp3      ",
                                "06他们.mp3               ",
                                "07海的女儿.mp3      ",
                                "08交河.mp3               ",
                                "09这个世界会好吗&人民不需要自由&妈妈.mp3               "
                                ]
                            },
                            {
                                "album": "工体东路没有人(2009)", "music": [
                                "01 Forbidden Game (被禁忌的游戏) [Live].mp3      ",
                                "02 Be With You (和你在一起) [Live].mp3               ",
                                "03 It Has Come (来了) [Live].mp3      ",
                                "04 Kafka (卡夫卡) [Live].mp3               ",
                                "05 Black Envelop (黑色信封) [Live].mp3      ",
                                "06 Alan (阿兰) [Live].mp3               ",
                                "07 A Southern City In A Late Spring（春末的南方城市）[Live].mp3      ",
                                "08 They (他们) [Live].mp3               ",
                                "09 A Vague Talk (暧昧) [Live].mp3               ",
                                "10 Marriage (结婚) [Live].mp3      ",
                                "11 Has Man A Future (这个世界会好吗) [Live].mp3               ",
                                "12 Red Balloon (红色气球) [Live].mp3      ",
                                "13 Moon Says My Heart (月亮代表我的心) [Live].mp3               ",
                                "14 Miss Dong (董卓瑶) [Live].mp3      ",
                                "15 Once Upon A Time (青春) [Live].mp3               ",
                                "16 When I Miss Her (想起了她) [Live Bonus Track].mp3               "
                                ]
                            },
                            {
                                "album": "二零零九年十月十六日事件(2009)", "music": [
                                "01黑色信封.mp3      ",
                                "02董卓瑶.mp3               ",
                                "03春末的南方城市.mp3      ",
                                "04来了.mp3               ",
                                "05广场.mp3      ",
                                "06青春.mp3               ",
                                "07他们.mp3      ",
                                "08被禁忌的游戏.mp3               ",
                                "09这个世界会好吗.mp3               ",
                                "10妈妈.mp3      ",
                                "11听妈妈讲过去的事情.mp3               ",
                                "12陀螺.mp3      ",
                                "13鸟语.mp3               ",
                                "14狐狸.mp3      ",
                                "15达摩流浪者.mp3               ",
                                "16结婚.mp3      ",
                                "17来自我心.mp3               ",
                                "18虎口脱险.mp3      ",
                                "19恋恋风尘.mp3               ",
                                "20倒影.mp3      ",
                                "21鸵鸟.mp3               ",
                                "22天空之城.mp3      ",
                                "23苍井空.mp3               ",
                                "24意味.mp3               ",
                                "25家乡.mp3      ",
                                "26 1990年的春天.mp3               ",
                                "27冬妮娅.mp3               "
                                ]
                            },
                            {
                                "album": "我爱南京(2009)", "music": [
                                "01 意味.mp3      ",
                                "02 苍井空.mp3               ",
                                "03 结婚.mp3      ",
                                "04 鸵鸟.mp3               ",
                                "05 天空之城.mp3      ",
                                "06 倒影.mp3               ",
                                "07 爱.mp3      ",
                                "08 家乡.mp3               ",
                                "09 1990年的春天.mp3               ",
                                "10 冬妮娅.mp3      ",
                                "11 听妈妈讲那过去的事情.mp3               ",
                                "12 美丽的梭罗河.mp3      ",
                                "13 米店.mp3               ",
                                "14 思念观世音.mp3      ",
                                "15 在那遥远的地方.mp3               ",
                                "16 再见.mp3               "
                                ]
                            },
                            {
                                "album": "你好，郑州(2010)", "music": [
                                "01墙上的向日葵.mp3      ",
                                "02铅笔.mp3               ",
                                "03关于郑州的记忆.mp3      ",
                                "04忽然.mp3               ",
                                "05秋天的老狼.mp3      ",
                                "06带亲.mp3               ",
                                "07她.mp3      ",
                                "08路 (李志、邵夷贝).mp3               ",
                                "09夜.mp3               ",
                                "10铅笔(吉松浩版).mp3               "
                                ]
                            },
                            {
                                "album": "F(2011)", "music": [
                                "01寻找.mp3      ",
                                "02尽头.mp3               ",
                                "03门.mp3      ",
                                "04下雨.mp3               ",
                                "05山阴路的夏天.mp3      ",
                                "06女神.mp3               ",
                                "07你的早晨.mp3      ",
                                "08杭州.mp3               ",
                                "09日.mp3               "
                                ]
                            },     
                            {
                                "album": "Imagine(2011)", "music": [
                                "01. 青春.mp3      ",
                                "02. 离婚.mp3               ",
                                "03. 我们不能失去信仰.mp3      ",
                                "04. 喀纳斯.mp3               ",
                                "05. 天空之城.mp3      ",
                                "06. 苍井空.mp3               ",
                                "07. 关于郑州的记忆.mp3      ",
                                "08. 海的女儿.mp3               ",
                                "09. 她.mp3               ",
                                "10. 家乡.mp3      ",
                                "11. 结婚.mp3               ",
                                "12. 秋天的老狼.mp3      ",
                                "13. 被禁忌的游戏.mp3               ",
                                "14. 寻找.mp3      ",
                                "15. 斜.mp3               ",
                                "16. 和你在一起.mp3      ",
                                "17. 门.mp3               ",
                                "18. 尽头.mp3      ",
                                "19. 女神.mp3               ",
                                "20. 杭州.mp3      ",
                                "21. 翁庆年的六英镑.mp3               ",
                                "22. 红色气球.mp3      ",
                                "23. 1990的春天.mp3               ",
                                "24. 结尾.mp3               "
                                ]
                            },     
                            {
                                "album": "108 个关键词 2012", "music": [
                                "下雨.mp3      ",
                                "人民不需要自由.mp3               ",
                                "倒影.mp3      ",
                                "关于郑州的记忆.mp3               ",
                                "和你在一起.mp3      ",
                                "和你在一起合唱.mp3               ",
                                "墙上的向日葵.mp3      ",
                                "她+我们不能失去信仰+1990年的春天.mp3               ",
                                "姐姐.mp3               ",
                                "尽头.mp3      ",
                                "山阴路独白版.mp3               ",
                                "山阴路的夏天.mp3      ",
                                "广场.mp3               ",
                                "忽然.mp3      ",
                                "来了.mp3               ",
                                "董卓瑶.mp3      ",
                                "阿兰.mp3               ",
                                "青春.mp3      ",
                                "黑色信封.mp3               "
                                ]
                            }, 
                            {
                                "album": "勾三搭四(2013)", "music": [
                                "1990年的春天.mp3      ",
                                "下雨.mp3               ",
                                "你的早晨&天空之城&暧昧.mp3      ",
                                "和你在一起.mp3               ",
                                "墙上的向日葵.mp3      ",
                                "妈妈.mp3               ",
                                "山阴路的夏天.mp3      ",
                                "意味.mp3               ",
                                "斜.mp3               ",
                                "春末的南方城市.mp3      ",
                                "来了.mp3               ",
                                "杭州&我们不能失去信仰.mp3      ",
                                "离婚.mp3               ",
                                "秋天的老狼.mp3      ",
                                "翁庆年的六英镑.mp3               ",
                                "董卓瑶.mp3      ",
                                "被禁忌的游戏.mp3               ",
                                "这个世界会好吗.mp3      ",
                                "铅笔.mp3               ",
                                "门.mp3      ",
                                "黑色信封.mp3               "
                                ]
                            }, 
                            {
                                "album": "1701(2014)", "music": [
                                "01大象.mp3      ",
                                "02鼠说.mp3               ",
                                "03定西.mp3      ",
                                "04看见.mp3               ",
                                "05不多.mp3      ",
                                "06热河.mp3               ",
                                "07好威武支持有希望.mp3      ",
                                "08方式.mp3               "
                                ]
                            },  
                            {
                                "album": "iO(2014)", "music": [
                                "01杭州.mp3      ",
                                "02墙上的向日葵.mp3               ",
                                "03铅笔.mp3      ",
                                "04来了.mp3               ",
                                "05下雨&董卓瑶&忽然.mp3      ",
                                "06这个世界会好吗.mp3               ",
                                "07妈妈.mp3      ",
                                "08定西.mp3               ",
                                "09方式.mp3               ",
                                "10鸵鸟&天空之城&我们不能失去信仰.mp3               ",
                                "11山阴路的夏天.mp3               "
                                ]
                            },   
                            {
                                "album": "看见(2015)", "music": [
                                "01看见.mp3      ",
                                "02黑色信封.mp3               ",
                                "03苍井空.mp3      ",
                                "04春末的南方城市.mp3               ",
                                "05你离开了南京 从此没有人和我说话.mp3      ",
                                "06下雨.mp3               ",
                                "07热河.mp3      ",
                                "08董卓瑶.mp3               ",
                                "09离婚.mp3               ",
                                "10梵高先生.mp3               "
                                ]
                            },  
                            {
                                "album": "动静(2015)", "music": [
                                "01 好威武支持有希望+倒影+青春+人民不需要自由(2015动静版).mp3      ",
                                "02你的早晨 (2015动静版).mp3               ",
                                "03普希金 (2015动静版).mp3      ",
                                "04卡夫卡 (2015动静版).mp3               ",
                                "05和你在一起 (2015动静版).mp3      ",
                                "06忽然 (2015动静版).mp3               ",
                                "07定西 (2015动静版).mp3      ",
                                "08地方(2015动静版).mp3               ",
                                "09这个世界会好吗 (2015动静版).mp3               ",
                                "10墙上的向日葵 (2015动静版).mp3               ",
                                "11尽头 (2015动静版).mp3               "
                                ]
                            },    
                            {
                                "album": "北京不插电现场(2016)", "music": [
                                "01黑色信封 (2016 unplugged).mp3      ",
                                "02鸵鸟 (2016 unplugged).mp3               ",
                                "03大象 (2016 unplugged).mp3      ",
                                "04定西 (2016 unplugged).mp3               ",
                                "05这个世界会好吗 (2016 unplugged).mp3      ",
                                "06结婚 (2016 unplugged).mp3               ",
                                "07关于郑州的记忆 (2016 unplugged).mp3      ",
                                "08杭州 (2016 unplugged).mp3               ",
                                "09热河 (2016 unplugged).mp3               ",
                                "10春末的南方城市 (2016 unplugged).mp3               ",
                                "11鼠说 (2016 unplugged).mp3               ",
                                "12山阴路的夏天 (2016 unplugged).mp3               "
                                ]
                            },   
                            {
                                "album": "8(2016)", "music": [
                                "01歌声与微笑.mp3      ",
                                "02蜗牛与黄鹂鸟.mp3               ",
                                "03兰花草.mp3      ",
                                "04数鸭子.mp3               ",
                                "05朋友越多越快乐.mp3      ",
                                "06Hey Jude.mp3               ",
                                "07采蘑菇的小姑娘.mp3      ",
                                "08小螺号.mp3               "
                                ]
                            },   
                            {
                                "album": "在每一条伤心的应天大街上(2016)", "music": [
                                "01在每一条伤心的应天大街上.mp3      ",
                                "02一头偶像.mp3               ",
                                "03克兰河.mp3      ",
                                "04死人.mp3               ",
                                "05一个夜晚.mp3      ",
                                "06哦吼.mp3               ",
                                "07彩色派对.mp3      ",
                                "08你好明天.mp3      ",
                                "09地方.mp3               "
                                ]
                            },   
                            {
                                "album": "电声与管弦乐(2016)", "music": [
                                "序曲.mp3      ",
                                "杭州.mp3               ",
                                "尽头.mp3      ",
                                "定西.mp3               ",
                                "春末的南方城市.mp3      ",
                                "黑色信封.mp3               ",
                                "铅笔.mp3      ",
                                "和你在一起.mp3               ",
                                "墙上的向日葵.mp3               ",
                                "大象.mp3               ",
                                "门.mp3               ",
                                "回答.mp3               "
                                ]
                            }, 
                            {
                                "album": "爵士乐与不插电新编12首(2017)", "music": [
                                "李志 - 一个夜晚 (相信未来版).mp3      ",
                                "李志 - 关于郑州的记忆 (相信未来版).mp3               ",
                                "李志 - 卡夫卡 (相信未来版).mp3      ",
                                "李志 - 死人 (相信未来版).mp3               ",
                                "李志 - 热河 (相信未来版).mp3      ",
                                "李志 - 爱 (相信未来版).mp3               ",
                                "李志 - 看见 (相信未来版).mp3      ",
                                "李志 - 离婚 (相信未来版).mp3               ",
                                "李志 - 翁庆年的六英镑 (相信未来版).mp3               ",
                                "李志 - 董卓瑶 (相信未来版).mp3               ",
                                "李志 - 鸵鸟 (相信未来版).mp3               ",
                                "李志 - 鼠说 (相信未来版).mp3               "
                                ]
                            }, 
                            {
                                "album": "电声与管弦乐Ⅱ(2018)", "music": [
                                "李志 - 一头偶像 (相信未来版).mp3      ",
                                "李志 - 你好明天 (相信未来版).mp3               ",
                                "李志 - 哦吼 (相信未来版).mp3      ",
                                "李志 - 天空之城 (相信未来版).mp3               ",
                                "李志 - 家乡 (相信未来版).mp3      ",
                                "李志 - 寻找 (相信未来版).mp3               ",
                                "李志 - 山阴路的夏天 (相信未来版).mp3      ",
                                "李志 - 相信未来序曲 (乐曲).mp3      ",
                                "李志 - 这个世界会好吗 (相信未来版).mp3               "
                                ]
                            }],
                            myAuto:'',
                            palytime:'',
                            whetherrepeat:false,//播放模式选择
                            playflag:true,
                            newmusci:false,
                            angle:0

            }
        },
        watch:{
            // myAuto(val){
            //     console.log(val);
            //      if(val.ended || val.currentTime == val.duration){
            //             // if (whetherrepeat) {
            //                 // 如果重复播放，则直接播放
            //                 // this.play();
            //                 // return;
            //             // } else {
            //                 // 如果随机，继续下一曲
            //                 // nextone();
            //             // }
            //         }
            // },
            // palytime(val,oldval){
            //     console.log(val);
            //     // var length = val / this. * 100;
            // }
        },
        methods: {
            onSearch() {
                
            },
            puash(){
                this.playbtnflag = true;
                this.newmusci = false;
                this.myAuto.pause();
            },
            changeplaystate(){
                this.playbtnflag = false;
                // this.musicUrl = this.musicpath[2][0];
                // this.musicUrl = '../../../static/反光镜 - 只有音乐才是我的解药.mp3';
                this.myAuto = document.getElementById('myaudio');
                // document.getElementById('myaudio').play();
                
                // this.palytime = this.myAuto.currentTime;
                // if(!this.playbtnflag){
                //    this.playAudio(this.musicUrl);
                   this.myAuto.play();
                   var angle = 0;
                   var delta = 0.5;
                   setInterval(function () {
                        angle += delta;
                        $('#cover').rotate(angle);
                   }, 40);
                   setInterval(this.present, 100);

                // }else{
                //    this.myAuto.pause();
                // }
            },
            trim(s) { //获取音乐地址
                 return s.replace(/(^\s*)|(\s*$)/g, "");
            },
            sTohs(s) {
                //计算分钟
                //算法：将秒数除以60，然后下舍入，既得到分钟数
                var h;
                h = Math.floor(s / 60);
                //计算秒
                //算法：取得秒%60的余数，既得到秒数
                s = s % 60;
                //将变量转换为字符串
                h += '';
                s += '';
                //如果只有一位数，前面增加一个0
                h = (h.length == 1) ? '0' + h : h;
                s = (s.length == 1) ? '0' + s : s;
                if(isNaN(h)){
                    return "&infin;"
                }
                return h + ':' + s;
            },
            //监听方法
            present(){
                if(this.newmusci){
                  this.myAuto = audio;
                }
                var length = this.myAuto.currentTime / this.myAuto.duration * 100;
                this.playlineLength = length;
                this.bofangchangdu = length;
                this.musicTime = this.sTohs(parseInt(this.myAuto.duration));
                this.palytime = this.sTohs(parseInt(this.myAuto.currentTime));
                if(this.myAuto.ended || this.myAuto.currentTime == this.myAuto.duration){
                    if (this.whetherrepeat) {
                        // 如果重复播放，则直接播放
                        this.myAuto.play();
                        return;
                    } else {
                        // 如果随机，继续下一曲
                        this.nextone();
                        // return;
                    }
                }
            },
            nextone(){
                this.newmusci = true;
                this.playlineLength = 0;
                this.musicUrl = '../../../static/a.mp3';
                clearInterval();
                this.playAudio(this.musicUrl);
            },
            playAudio(src){
                if(audio){
                    audio.src == null;
                    audio.load();
                }else{
                    audio = new Audio();
                }
                audio.src = src;
                audio.play();
                setInterval(this.present, 100);
                var angle = 0;
                var delta = 1;
                setInterval(function () {
                    angle += delta;
                    document.getElementById('cover').rotate(angle);
                }, 40);
            },
            onClickLeft1(){
                this.musicplay = false;
            },
            onClickLeft(){
                this.songListshow = false;
            },
            songlistm(i,index){
                this.nowgedan = i;
                this.nowindex = index;
                this.songListshow = true;
            },
            openplaypon(){
                this.musicplay = true;
            }


        },
        mounted(){
            var path = "http://122.114.152.131/music";
            this.musicpath = [];       //存储所有播放路径和曲目名称
                this.allmusicpath = [];
                for(var i in this.allmuisc){
                    for(let j in this.allmuisc[i].music){
                        this.musicpath.push([path + "/" + this.allmuisc[i].album + "/" + this.trim(this.allmuisc[i].music[j]),this.trim(this.allmuisc[i].music[j])]);
                        this.allmusicpath.push([path + "/" + this.allmuisc[i].album + "/" + this.trim(this.allmuisc[i].music[j]),this.trim(this.allmuisc[i].music[j])]);
                    }
            }
        }

    }
</script>

<style scoped>
.van-search{
    background: #d13c37 !important;
}
.van-search__action{
    color: white;
}
.imgMap{
    width: calc(100% - 30px);
    padding: 15px;
    height: 31px;
    background: #d13c37;
    margin-bottom: 70px;
}
.imgMap_model{
    background: #ff44ff;
    border-radius:7px;
    overflow: hidden;
}
.imgMap_model img{
    width: 100%;
    position: relative;
    top: -10px;

}
.PrivateRecommend{
    width: calc(100% - 30px);
    height: 80px;
    border-bottom: 1px solid #f4f4f4;
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.RecommendInit{
    height: 80px;
    width: 80px;
    margin: 0 15px;
}
.RecommendIcon{
    width: 30px;
    height: 30px;
    border-radius:50%;
    background: #d13c37;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    justify-content: center;
}
.RecommendName{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 13px;
}
.songSheetTitle{
    height: 30px;
    width: calc(100% - 30px);
    margin-left:14px;
    line-height: 30px;
    font-size: 15px; 
    color: #666;
}
.sheetList{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 80px;
}
.songsheetinit{
    width: calc((100% - 90px) / 3);
    height: 120px;
    /* background: #d13c37; */
    margin: 15px;
    margin-bottom:0;

}
.songsheetImg{
    height: 100%;
    height: 80px;
    overflow: hidden;
    background:url('../../assets/img/songsheet.png') no-repeat;
    background-size:100% 160%;
    border-radius:2px;
    overflow: hidden; 
}
.songsheetImg img{
    width: 100%;
}
.playmodel{
    width: 100%;
    height: 60px;
    /* background: #f4f4f4; */
    background: white;
    border-top: 1px solid #f4f4f4;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.musicImg{
    height: 40px;
    width: 40px;
    margin:0 15px;
    background: url('../../assets/img/songsheet.png') no-repeat;
    background-size: 100% 150%;

}
.musicImg img{
    width: 100%;
    height: 100%;
}
.musicprogress{
    width: 230px;
}
.palybtn{
    /* width: 30px; */
    /* height: 30px; */
    padding:3px 4px 3px 4px;
    border: 2px solid #333;
    border-radius: 50%;
    margin-left: 15px;
}
.songlistpopon{
    width: 100%;
    height: 100%;
    background: white;
    position: fixed;
    left: 0;
    top: 0;
    overflow: scroll;
}
.nowsonglist{
    width: 100%;
    background: white;
}
.songlistingfo{
    height: 200px;
    width: calc(100% - 30px);
    padding:15px 15px;
    display: flex;
    flex-direction: row;
    align-items: inherit;
    background: url('../../assets/img/songsheet.png') no-repeat;
    background-size: 300% 500%;
    opacity:0.9;
}
.songlistimg{
    height: 120px;
    width: 120px;
    background: url('http://senyepai.com/lizhi/images/0.jpg') no-repeat;
    background-size: 100% 100%;
}
.songlistimg img{
    width: 100%;
    height: 100%;
}
.sonlisttitle{
    flex-grow: 1;
    margin-left: 20px;
    font-size: 22px;
    color: white;
}
.musicplaypopon{
    width: 100%;
    height: 100%;
    background: white;
    position: fixed;
    left: 0;
    top: 0;
    overflow: scroll;
}
.playmusicimg{
    width: 220px;
    height: 220px;
    margin: auto;
    margin-top: 80px;
    border-radius: 50%;
    overflow: hidden;
    background:url('../../assets/img/songsheet.png') no-repeat;
    background-size:100% 160%;
    box-shadow: 0px 0px 10px #999;
}
.playmusicimg img{
    width: 100%;
    height: 100%;
}
.playbtnlist{
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    /* background: #333; */
}
.playtimeinit{
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.playtimeInit{
    height: 20px;
    line-height: 20px;
    padding: 10px;
    font-size: 12px;
    color: #666;
}
.jindutiao{
    width: 275px;
}
.btninit{
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.btninti1{
    height: 35px;
    width: 35px;
    /* background: chartreuse; */
    border-radius:50%;
    margin: 0 20px;
}
.btninit2{
    height: 50px;
    width: 50px;
    /* background: chartreuse; */
    border: 1.5px solid #333;
    border-radius:50%;
    margin: 0 20px;
}
.mtop{
    background: url('../../assets/img/top.png') no-repeat;
    background-position: 50% 50%;
    background-size: 30px 30px;
}
.mnext{
    background: url('../../assets/img/next.png') no-repeat;
    background-position: 50% 50%;
    background-size: 30px 30px;
}
.mstart{
    background: url('../../assets/img/start.png') no-repeat;
    background-position: 50% 50%;
    background-size: 30px 30px;
}
.mstop{
    background: url('../../assets/img/stop.png') no-repeat;
    background-position: 50% 50%;
    background-size: 30px 30px;
}
</style>