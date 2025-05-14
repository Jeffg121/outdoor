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

const getBasePath = () => {
  const baseUrl = import.meta.env.BASE_URL;
  return baseUrl === '/' ? '' : baseUrl;
};

const data: ISiteMetadataResult = {
  siteTitle: 'Outdoors Map',
  siteUrl: 'https://jeffg121.github.io/outdoor',
  logo: 'https://picx.zhimg.com/v2-fbedec8ead9d47a7cb596d240e9eb8c5_xll.jpg?source=32738c0c&needBackground=1',
  description: 'Personal site and blog',
  keywords: 'workouts, running, cycling, riding, roadtrip, hiking, swimming',
  navLinks: [
    {
      name: 'Summary',
      url: `${getBasePath()}/summary`,
    },
    {
      name: 'Blog',
      url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg4NzE1NTI4MA==&action=getalbum&album_id=1540766711656824835',
    },
    {
      name: 'About',
      url: 'https://github.com/ben-29/workouts_page/blob/master/README-CN.md',
    },
  ],
};

export default data;
