export function getSanityLinkUrl(sanityLinkObject: any) {
  if (sanityLinkObject._type === "linkExternal") {
    const { url, newWindow, title } = sanityLinkObject;

    return {
      url,
      newWindow,
      title,
      isExternalLink: true,
    };
  } else if (sanityLinkObject._type === "linkInternal") {
    const { title, reference } = sanityLinkObject;
    let url: string;

    if (reference._type === "product") {
      url = `/product/${reference.store.slug.current}`;
    } else if (reference._type === "collection") {
      url = `/collection/${reference.store.slug.current}`;
    } else if (reference._type === "page" || reference._type === "preorder") {
      url = `/${reference.slug.current}`;
    } else {
      url = "/";
    }

    return {
      url,
      newWindow: false,
      title,
      isExternalLink: false,
    };
  }

  return {
    url: "/",
    newWindow: false,
    title: { en: "Homepage", fr: "Page d'accueil", ar: "الصفحة الرئيسية" },
    isExternalLink: false,
  };
}
