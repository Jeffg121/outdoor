interface ISiteMetadataResult {
  siteTitle: string;
  siteUrl: string;
  description: string;
  keywords: string;
  logo: string;
  navLinks: {
    name: string;
    url: string;
  }[];
}

const data: ISiteMetadataResult = {
  siteTitle: 'Outdoors Map',
  siteUrl: 'https://www.zhihu.com/people/wan-sai-ji',
  logo: 'https://pic1.zhimg.com/v2-fbedec8ead9d47a7cb596d240e9eb8c5_xl.jpg?source=32738c0c',
  description: 'Personal site and blog',
  keywords: 'workouts, running, cycling, riding, roadtrip, hiking, swimming',
  navLinks: [
    {
      name: '赛记',
      url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg4NzE1NTI4MA==&action=getalbum&album_id=1540766711656824835&scene=173&subscene=&sessionid=svr_cf360113092&enterid=1742283048&from_msgid=2247484184&from_itemidx=1&count=3&nolastread=1#wechat_redirect',
    },
    {
      name: '关于',
      url: 'https://github.com/ben-29/workouts_page/blob/master/README-CN.md',
    },
  ],
};

export default data;

