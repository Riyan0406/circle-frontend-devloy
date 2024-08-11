interface IThread {
    id: string;
    content: string;
    userId: string;
    threadId?: string;
    image: IThreadImage[];
    createdAt: Date;
    author: IUser;
    _count: ICount;
}

interface IThreadImage {
    id?: string;
    url?: string;
}

interface IFollowing {
    followingId: string,
    followedById: string,
    createdAt: Date,
}

interface IUser {
    id: string;
    fullname: string;
    email: string;
    following: IFollowing[];
    followedBy: [];
    profile: IProfile;
}

interface ICount {
    replies?: number;
    like?: number;
}

interface IProfile {
    id: string;
    username: string;
    avatar: string;
    cover: string;
    bio: string;
    userId: string;
}

interface ILoggedUser {
    id: string;
    fullname: string;
    email: string;
    password: string;
    profile: IProfile;
    following: IFollowing[];
    followedBy: IFollowing[];
    threads: IThread[];
    _count: {
        followedBy: number;
        following: number;
    };
}

interface IEditProfile {
    fullname: string;
    username: string;
    avatar: string;
    cover: string;
    bio: string;
}
