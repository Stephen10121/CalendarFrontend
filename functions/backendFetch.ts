import { POST_SERVER } from "./variables";

export type PendingGroupsType = {
    groupId: string;
    groupName: string;
}

export interface GoogleLoginData {
  CreatedAt: string;
  DeletedAt: string;
  ID: number;
  UpdatedAt: string;
  email: string;
  googId: string;
  firstName: string;
  lastName: string;
  name: string;
  groups: string;
  pendingGroups: string;
  locale: string;
  picture: string;
  verifiedEmail: string;
}

export type GroupsType = {
    groupId: string;
    groupName: string;
    groupOwner: string;
    othersCanAdd: boolean;
}

export interface FetchGroupsResponse {
    error: string;
    data?: {
        groups: GroupsType[];
        pendingGroups: PendingGroupsType[];
    };
}

export async function fetchGroups(token: string): Promise<FetchGroupsResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/myGroups`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "omit"
      })
      const groupsJson = await groups.json();
      console.log(groupsJson)
      if (groupsJson.error) {
          return {error: groupsJson.error}
      }
      return { error: "", data: { groups: groupsJson.groups, pendingGroups: groupsJson.pendingGroups} }
    } catch (err) {
      console.error(err);
      return {error: "Failed to fetch Groups."};
    }
}

export interface ValidateResponse {
  error: boolean;
  data?: {
      userData: GoogleLoginData;
  };
}

export async function validate(token: string): Promise<ValidateResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/validate`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "omit"
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
        return {error: true}
      }
      return {error: false, data: groupsJson.data}
    } catch (err) {
      console.error(err);
      return {error: true};
    }
}

export interface Particapant {
  name: string;
  id: number;
}

export interface GroupInfoData {
  about_group: string;
  created: string;
  group_id: string;
  name: string;
  owner: string;
  particapants: Particapant[];
  yourowner?: {
    ownerId: number;
    pending_particapants: Particapant[];
  }
}

export interface GroupInfoResponse {
error: string;
data?: GroupInfoData;
}

export async function groupInfo(groupId: string, token: string): Promise<GroupInfoResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/groupInfo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "omit",
        body: JSON.stringify({
            "groupId": groupId,
        })
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
        return {error: groupsJson.error}
      }
      return {error: "", data: groupsJson}
    } catch (err) {
      console.error(err);
      return {error: "Error Getting Group Data."};
    }
}

interface AcceptParticapantResponse {
  message?: string;
  error?: string;
}

export async function acceptParticapant(groupId: string, token: string, particapant: string): Promise<AcceptParticapantResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/acceptUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "omit",
        body: JSON.stringify({
            "id": groupId,
            "particapant": particapant
        })
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
        return {error: groupsJson.error}
      }
      return {error: "", message: groupsJson}
    } catch (err) {
      console.error(err);
      return {error: "Error Accepting Particapant."};
    }
}

export interface GoogleLoginProps {
  error?: string,
  data?: {
    userData: GoogleLoginData,
    token: string
  }
}

export async function googleLoginOrRegister(accessToken: string): Promise<GoogleLoginProps> {
  try {
    const groups = await fetch(`${POST_SERVER}/google`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "omit",
      body: JSON.stringify({"token": accessToken})
    })
    
    const groupsJson = await groups.json();
    
    if (groupsJson.error !== "" || !groupsJson.data) {
      return { error: "Error logging in user." }
    }

    return { data: { userData: groupsJson.data.userData, token: groupsJson.data.token} }
  } catch (err) {
    return { error: "Error logging in user." }
  }
}

export interface JoinGroupResponse {
  error: string;
  message?: string;
}

export async function joinGroup(groupId: string, password: string, token: string): Promise<JoinGroupResponse> {
  try {
    const groups = await fetch(`${POST_SERVER}/joinGroup`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      credentials: "omit",
      body: JSON.stringify({
          "id": groupId,
          "password": password
      })
    })
    const groupsJson = await groups.json();
    if (groupsJson.error) {
      return {error: groupsJson.error}
    }
    return {error: "", message: groupsJson.message}
  } catch (err) {
    console.error(err);
    return {error: "Error Joining Group."};
  }
}