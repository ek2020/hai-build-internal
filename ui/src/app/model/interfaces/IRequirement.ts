export interface IUpdateRequirementRequest {
    updatedReqt: string;
    fileContent: string;
    contentType: string;
    id: string;
    reqId: string;
    reqDesc: string;
    addReqtType: string;
    name: string;
    description: string;
    useGenAI: boolean;
}

export interface IAddRequirementRequest {
    reqt?: string;
    fileContent?: string;
    contentType: string;
    id: string;
    title: string;
    addReqtType: string;
    name: string;
    description: string;
    useGenAI: boolean;
}