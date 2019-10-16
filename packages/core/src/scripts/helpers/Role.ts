export namespace Role {
  export enum TenantRole {
    Admin = 2,
    Member = 1,
  }

  /**
   * 特定のリソースへのアクセスに必要な role (necessaryRole) と ユーザーの role (userRole) を比較し、アクセス可否を boolean で返します。
   * @param {TenantRole} necessaryRole
   * @param {TenantRole} userRole
   * @returns {boolean}
   */
  export function isAccessible(necessaryRole: TenantRole, userRole: TenantRole): boolean {
    return necessaryRole <= userRole;
  }
}
