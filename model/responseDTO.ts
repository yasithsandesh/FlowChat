import { User } from "./user.dto"

export interface ResponseDTO {
    status: boolean
    message: string
}

export interface leterResponse {
    status: boolean
    message: string
    data: string
}

export interface ChatData {
    otherUserId: number
    otherUserMobile: string
    otherUserName: string
    otherUserStatus: number
    avatarImageFound: boolean
    avatarLetters: string
    message: string
    chatStatus: number,
    unseenCount:number,
    user:{
        id: number
        firstName: string
        lastName: string
        email: string
        mobile: string
        about: string
        registeredDate: string
        githubUsername: string
        userStatus: {
            id: number
            status: string
        }
        type: {
            id: number
            name: string
        },
        gitProfile:GitProfile
        gitAvatar:boolean
    },
}

export interface ChatDataResponse {
    status: boolean
    message: string
    chatDataList: ChatData[]
}

export interface OtherUser {
    avatarLetters: string,
    avatarImageFound: boolean,
    user: {
        id: number
        firstName: string
        lastName: string
        email: string
        mobile: string
        about: string
        registeredDate: string
        githubUsername: string
        userStatus: {
            id: number
            status: string
        }
        type: {
            id: number
            name: string
        },
        gitAvatar:boolean
    },
    gitProfile:GitProfile

}

export interface LoadUsersResponseDTO {
    firends: OtherUser[]
    allUsers: OtherUser[]
}

// private int otherUserId;
// private String otherUserMobile;
// private String otherUserName;
// private int otherUserStatus;
// private boolean avatarImageFound;
// private String avatarLetters;
// private String message;
// private int chatStatus;


export interface UpdateResponseDTO {
    status: boolean
    message: string
    data:User
}

export interface GitProfile {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean | null;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}


// "login": "kentcdodds",
// "id": 1500684,
// "node_id": "MDQ6VXNlcjE1MDA2ODQ=",
// "avatar_url": "https://avatars.githubusercontent.com/u/1500684?v=4",
// "gravatar_id": "",
// "url": "https://api.github.com/users/kentcdodds",
// "html_url": "https://github.com/kentcdodds",
// "followers_url": "https://api.github.com/users/kentcdodds/followers",
// "following_url": "https://api.github.com/users/kentcdodds/following{/other_user}",
// "gists_url": "https://api.github.com/users/kentcdodds/gists{/gist_id}",
// "starred_url": "https://api.github.com/users/kentcdodds/starred{/owner}{/repo}",
// "subscriptions_url": "https://api.github.com/users/kentcdodds/subscriptions",
// "organizations_url": "https://api.github.com/users/kentcdodds/orgs",
// "repos_url": "https://api.github.com/users/kentcdodds/repos",
// "events_url": "https://api.github.com/users/kentcdodds/events{/privacy}",
// "received_events_url": "https://api.github.com/users/kentcdodds/received_events",
// "type": "User",
// "site_admin": false,
// "name": "Kent C. Dodds",
// "company": "@epicweb-dev ",
// "blog": "https://kentcdodds.com",
// "location": "Salt Lake City, Utah, USA",
// "email": "me+github@kentcdodds.com",
// "hireable": null,
// "bio": "Improving the world with quality software · Husband, Father, Latter-day Saint, Teacher, OSS · @remix-run · TestingJavaScript.com · EpicReact.Dev · Be Kind",
// "twitter_username": "kentcdodds",
// "public_repos": 711,
// "public_gists": 257,
// "followers": 33204,
// "following": 43,
// "created_at": "2012-03-04T22:32:01Z",
// "updated_at": "2024-09-08T12:51:29Z"


export interface RepositoryOwner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  }
  
  export interface Repository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: RepositoryOwner;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: string | null;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
  }