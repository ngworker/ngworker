/**
 * package.json configuration file in workspace root directory.
 */
export interface WorkspaceRootPackageJson {
  /**
   * Package dependencies used at runtime.
   */
  readonly dependencies?: {
    /**
     * Package name mapped to version range.
     */
    readonly [packageName: string]: string;
  };
  /**
   * Package dependencies not used during runtime.
   */
  readonly devDependencies?: {
    /**
     * Package name mapped to version range.
     */
    readonly [packageName: string]: string;
  };
}
