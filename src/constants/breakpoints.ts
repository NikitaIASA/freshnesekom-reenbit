export const ITEMS_TO_SHOW = {
    DESKTOP: 4,
    BIG_TABLET: 3,
    TABLET: 2,
    MOBILE: 1,
};

export const BREAKPOINTS = {
    DESKTOP_MAX: 3000,
    DESKTOP_MIN: 1024,
    BIG_TABLET_MAX: 1024,
    BIG_TABLET_MIN: 768,
    TABLET_MAX: 768,
    TABLET_MIN: 576,
    MOBILE_MAX: 576,
    SMALL_MOBILE_MAX: 320,
};

export const responsiveCarousel = {
    desktop: {
        breakpoint: { max: BREAKPOINTS.DESKTOP_MAX, min: BREAKPOINTS.DESKTOP_MIN },
        items: ITEMS_TO_SHOW.DESKTOP,
    },
    bigTablet: {
        breakpoint: { max: BREAKPOINTS.BIG_TABLET_MAX, min: BREAKPOINTS.BIG_TABLET_MIN },
        items: ITEMS_TO_SHOW.BIG_TABLET,
    },
    tablet: {
        breakpoint: { max: BREAKPOINTS.TABLET_MAX, min: BREAKPOINTS.TABLET_MIN },
        items: ITEMS_TO_SHOW.TABLET,
    },
    mobile: {
        breakpoint: { max: BREAKPOINTS.MOBILE_MAX, min: 0 },
        items: ITEMS_TO_SHOW.MOBILE,
    },
};
