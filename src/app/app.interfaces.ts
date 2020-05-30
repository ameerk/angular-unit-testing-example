export interface CatFact {
    used:      boolean;
    source:    string;
    type:      string;
    deleted:   boolean;
    _id:       string;
    __v:       number;
    text:      string;
    updatedAt: string;
    createdAt: string;
    status:    Status;
    user:      string;
}

export interface Status {
    verified:  boolean;
    sentCount: number;
}
