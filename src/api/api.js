import {
    wxRequest
} from '@/utils/wxRequest';
import wepy from 'wepy';


/**
 * 微信登陆接口。 返回的data是登陆标识字符串。 后续调用接口时需要在header里携带此值: login_token = xxxxxx
 * @param {*} params 包括用户信息等
 */
export const convertToken = (params) => wxRequest(params, '/platform/wechat/applet/login', true);
/**
 * qq登陆接口。 返回的data是登陆标识字符串。 后续调用接口时需要在header里携带此值: login_token = xxxxxx
 * @param {*} params 包括用户信息等
 */
export const convertQQToken = (params) => wxRequest(params, '/platform/qq/applet/login', true);
/**
 * 获取当前登陆用户的简略信息 GET
 */
export const getSimpleUserInfo = (params) => wxRequest(params, '/platform/user', true);
/**
 *  获取阿里oss的Token
 */
export const getAliOSSToken = (params) => wxRequest(params, '/platform/upload/getToken', false);
/**
 * 分享配置
 */
export const getShareConfig = (params) => wxRequest(params, '/platform/shareConfig', false);
/**
 * 收集保存formId
 */
export const saveFormId = (params) => wxRequest(params, '/platform/common/saveFormId', false);
/**
 * 拉取舍友列表
 * @param {*} params 页数等
 */
export const getMateList = (params) => wxRequest(params, '/platform/speak/roommate', false);
/**
 * 查询舍友详情
 */
export const getMateDetail = (params, mateId) => wxRequest(params, '/platform/speak/roommate/' + mateId, true);
/**
 * 拉取评论列表
 * @param {*} params 包括用户信息等
 */
export const getCommentList = (params) => wxRequest(params, '/platform/works/comment/list', false);

/**
 * 点赞或踩表白墙评论
 */
export const likeComment = (param) => wxRequest(param, '/platform/like/comment/2', false);

/**
 *  根据评论ID分页查询回复列表 GET
 */
export const getCommentReplyList = (params) => wxRequest(params, '/platform/works/comment/replyList', false);

//************************表白墙**********************************
/**
 * 推荐表白墙列表数据
 */
export const getRecommendConfess = (params) => wxRequest(params, '/platform/speak/works/recommend', false);
/**
 * 表白墙数据 - get
 */
export const getSpeakWorks = (params) => wxRequest(params, '/platform/speak/works', false);

/**
 * 我参与的表白墙数据 - get
 */
export const getMyJoinedConfess = (params) => wxRequest(params, '/platform/speak/works/impression', false);

/**
 *  保存表白墙作品
 */
export const publishWorks = (params) => wxRequest(params, '/platform/speak/works', false);
/**
 *  删除表白墙作品
 */
export const deleteWork = (params, workId) => wxRequest(params, '/platform/speak/works/' + workId, false);
/**
 * 表白墙点赞 - post
 */
export const likeWork = (params) => wxRequest(params, '/platform/speak/works/like', false);
/**
 *  表白墙作品详情
 */
export const getConfessDetail = (params, workId) => wxRequest(params, '/platform/speak/works/' + workId, false);
/**
 * 查询表白墙banner - get
 * type: banner类，1：表白墙 2：校园圈  3:卖舍友
 */
export const getBannerInfo = (params, type) => wxRequest(params, '/platform/speak/banner/' + type, false);

/**
 * 保存表白墙评论
 */
export const saveConfessComment = (params) => wxRequest(params, '/platform/speak/works/comment', false);
/**
 * 删除表白墙评论
 */
export const deleteConfessComment = (params, commentId) => wxRequest(params, '/platform/speak/works/comment/' + commentId, false);
/**
 * 获取表白墙置顶数据
 */
export const getTopConfess = (params) => wxRequest(params, '/platform/speak/works/top', false);


//************************卖舍友**********************************

/**
 * 推荐卖舍友数据
 */
export const getRecommendRoommate = (params) => wxRequest(params, '/platform/speak/roommate/recommend', false);

/**
 * 保存卖舍友作品
 */
export const publishRoommate = (params) => wxRequest(params, '/platform/speak/roommate', false);
/**
 * 我参与的卖舍友数据 - get
 */
export const getMyJoinedRoommate = (params) => wxRequest(params, '/platform/speak/roommate/impression', false);
/**
 *  删除卖舍友作品
 */
export const deleteRoommate = (params, roommateId) => wxRequest(params, '/platform/speak/roommate/' + roommateId, false);
/**
 * 卖舍友点赞 - post
 */
export const saveLikeMate = (params) => wxRequest(params, '/platform/speak/roommate/like', false);
/**
 *  保存卖舍友评论 POST
 */
export const saveRoomMateComment = (params, isShowLoading) => wxRequest(params, '/platform/speak/roommate/comment', isShowLoading);
/**
 *  删除卖舍友评论 DELETE
 */
export const deleteRoomMateComment = (params, commentId) => wxRequest(params, '/platform/speak/roommate/comment/' + commentId, false);

/**
 * 获取卖舍友置顶数据
 */
export const getTopRoommate = (params) => wxRequest(params, '/platform/speak/roommate/top', false);


//************************校园圈**********************************
/**
 * 查询校园圈 - get
 */
export const searchColleges = (params, isShowLoading) => wxRequest(params, '/platform/speak/mailbox', isShowLoading);

/**
 * 查询关注的校园圈 - get
 */
export const focusedSchools = (params) => wxRequest(params, '/platform/speak/mailbox/focus/list', false);
/**
 * 查询学校列表简略信息，id和name为空时返回用户关联的学校
 */
export const searchSchools = (params) => wxRequest(params, '/platform/speak/mailbox/simple', false);

/**
 * 绑定学校 - post
 */
export const bindSchool = (params) => wxRequest(params, '/platform/speak/mailbox/bind', false);

/**
 * 取消绑定学校 - post
 */
export const unbindSchool = (params) => wxRequest(params, '/platform/speak/mailbox/unbind', false);

/**
 * 关注学校 - post
 */
export const focusSchool = (params) => wxRequest(params, '/platform/speak/mailbox/focus', false);

/**
 * 取消关注学校 - post
 */
export const unFocusSchool = (params) => wxRequest(params, '/platform/speak/mailbox/unFocus', false);

/**
 * 创建学校 - post
 */
export const createSchool = (params) => wxRequest(params, '/platform/speak/mailbox', false);


//************************消息中心**********************************
/**
 * 获取消息中心数据
 */
export const getMessagecenterData = (params) => wxRequest(params, '/platform/messageCenter', false);
/**
 * 消息中心标记未读为已读
 */
export const markMessageRead = (params) => wxRequest(params, '/platform/messageCenter/markRead', false);

//************************我的**********************************

/**
 * 我关注的学校的表白墙
 */
export const getFocusConfess = (params) => wxRequest(params, '/platform/speak/works/focus', false);
/**
 * 我关注学校卖舍友列表
 */
export const getFocusRoommate = (params) => wxRequest(params, '/platform/speak/roommate/focus', false);

/**
 * 意见反馈 - post
 */
export const feedback = (params) => wxRequest(params, '/platform/feedback', false);

/**
 * 生成ali oss下的图片缩放的style，传入ui设定的宽高，该函数会自动*屏幕像素
 * {
 *     width:传入ui设定的像素值，
 *     height:传入ui设定的像素值，
 * }
 */
export const aliImageResizeStyle = (params) => {
    let pixelRatio = wepy.$instance.globalData.systemInfo.pixelRatio;
    pixelRatio = pixelRatio && pixelRatio > 0 ? pixelRatio : 1;
    //视网膜屏目前2以上几乎分辨不出效果
    pixelRatio = pixelRatio > 2 ? 2 : pixelRatio;
    let w = params && params.width ? params.width * pixelRatio : wepy.$instance.globalData.systemInfo.screenWidth / 2;
    let h = params && params.height ? params.height * pixelRatio : wepy.$instance.globalData.systemInfo.screenHeight / 2;

    return `x-oss-process=image/resize,m_lfit,h_${parseInt(h)},w_${parseInt(w)}/auto-orient,1/format,src`;
};

export const aliGifResizeStyle = (params) => {
    let pixelRatio = wepy.$instance.globalData.systemInfo.pixelRatio;
    pixelRatio = pixelRatio && pixelRatio > 0 ? pixelRatio : 1;
    let w = params && params.width ? params.width * pixelRatio : wepy.$instance.globalData.systemInfo.screenWidth / 2;
    let h = params && params.height ? params.height * pixelRatio : wepy.$instance.globalData.systemInfo.screenHeight / 2;

    return `x-oss-process=image/resize,m_lfit,h_${parseInt(h)},w_${parseInt(w)}/quality,q_80/auto-orient,1/format,src`;
};
/**
 * 生成ali oss下的url，
 * @param path 服务器返回的原图路径
 * @param style 指定的图片样式，
 * @returns image url
 */
export const aliOssImgUrl = (path, style) => {
    if (!path || path.length == 0) return path;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    let aliOSS = wepy.$instance.globalData.aliOssToken;
    // console.info('--- aliOSS -->' + JSON.stringify(aliOSS))
    let downloadPoint = (aliOSS && aliOSS.ossDownloadPoint) ? aliOSS.ossDownloadPoint : 'https://image.52mengdong.com';
    // let isGif = path.endsWith('.gif') || path.endsWith('.GIF')
    if (style) {
        return `${downloadPoint}/${path}?${style}`;
    }
    return `${downloadPoint}/${path}`;
};

/**
 * 分享出去的图片的裁剪样式，分享卡片的比例为5:4，固定宽高
 */
export const aliImageShareStyle = (params) => {
    let pixelRatio = wepy.$instance.globalData.systemInfo.pixelRatio;
    pixelRatio = pixelRatio && pixelRatio > 0 ? pixelRatio : 1;
    let w = 200 * pixelRatio;
    let h = 160 * pixelRatio;
    return `x-oss-process=image/resize,m_fill,h_${parseInt(h)},w_${parseInt(w)}/auto-orient,1/sharpen,1/format,jpg`;
};

/**
 * 投诉表白
 * @param params
 * @returns {*}
 */
export const complaintConfess = (params) => wxRequest(params, '/platform/speak/works/complaints', false);

/**
 * 投诉卖舍友
 * @param params
 * @returns {*}
 */
export const complaintRootmate = (params) => wxRequest(params, '/platform/speak/roommate/complaints', false);

/**
 * 查询投诉理由列表
 * @param params
 * @returns {*}
 */
export const complaintReasonList = (params) => wxRequest(params, '/platform/dic/complaints_type/works', false);

/**
 * 查询反馈列表
 * @param params
 * @returns {*}
 */
export const getFeedbackList = (params) => wxRequest(params, '/platform/feedback/list', false);

/**
 * 保存抱走作品
 * @param params
 * @returns {*}
 */
export const publishTakeaway = (params) => wxRequest(params, '/platform/speak/hug', false);

/**
 * 查询抱走作品列表
 * @param params
 * @returns {*}
 */
export const loadTakeawayList = (params) => wxRequest(params, '/platform/speak/hug', false);

/**
 * 点赞或踩抱走
 * @param param
 * @returns {*}
 */
export const likeTakeaway = (param) => wxRequest(param, '/platform/speak/hug/like', false);

/**
 * 查询是否发布了抱走
 * @param param
 * @param parentId
 * @returns {*}
 */
export const isPublishTakeaway = (param, parentId) => wxRequest(param, `/platform/speak/hug/checkWorks/${parentId}`, false);
