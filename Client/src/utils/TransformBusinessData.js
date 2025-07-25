export const transformBusinessData = (data) => ({
  businessName: data.businessName,
  typeOfBusiness: data.typeOfBusiness,
  country: data.country,
  address: data.address,
  contact: data.contact,
  note: data.note,
  expiredDate: data.expiredDate,
  package: data.package,
  status: data.status,
  assignedTeam: {
    team: data.team || "Creative Team",
  },
  socialMedia: {
    facebook: {
      url: data.facebookUrl,
      username: data.facebookUsername,
      password: data.facebookPassword,
    },
    tiktok: {
      url: data.tiktokUrl,
      username: data.tiktokUsername,
      password: data.tiktokPassword,
    },
    instagram: {
      url: data.instagramUrl,
      username: data.instagramUsername,
      password: data.instagramPassword,
    },
    youtube: {
      url: data.youtubeUrl,
      username: data.youtubeUsername,
      password: data.youtubePassword,
    },
    tripAdvisor: {
      url: data.tripadvisorUrl,
    },
    googleBusiness: {
      url: data.googleBusinessUrl,
    },
    googlePlus: {
      url: data.googlePlusUrl,
    },
    googlePhoto: {
      url: data.googlePhotoUrl,
    },
    website: {
      url: data.websiteUrl,
    },
  },
  emailCredentials: {
    email: data.emailUsername,
    password: data.emailPassword,
  },
  othersLinks: data.otherLinks,
});
