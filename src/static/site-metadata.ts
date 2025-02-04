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
      url: 'https://www.zhihu.com/people/wan-sai-ji',
    },
    {
      name: '关于',
      url: 'https://github.com/ben-29/workouts_page/blob/master/README-CN.md',
    },
  ],
};

export default data;

