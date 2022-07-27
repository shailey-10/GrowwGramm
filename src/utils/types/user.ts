export interface User {
    id:                 string;
    updated_at:         Date;
    username:           string;
    name:               string;
    first_name:         string;
    last_name:          string;
    instagram_username: string;
    twitter_username:   string;
    portfolio_url:      null;
    bio:                string;
    location:           string;
    total_likes:        number;
    total_photos:       number;
    total_collections:  number;
    followed_by_user:   boolean;
    followers_count:    number;
    following_count:    number;
    downloads:          number;
    social:             Social;
    profile_image:      ProfileImage;
    badge:              Badge;
    links:              Links;
}

export interface Badge {
    title:   string;
    primary: boolean;
    slug:    string;
    link:    string;
}

export interface Links {
    self:      string;
    html:      string;
    photos:    string;
    likes:     string;
    portfolio: string;
}

export interface ProfileImage {
    small:  string;
    medium: string;
    large:  string;
}

export interface Social {
    instagram_username: string;
    portfolio_url:      string;
    twitter_username:   string;
}
