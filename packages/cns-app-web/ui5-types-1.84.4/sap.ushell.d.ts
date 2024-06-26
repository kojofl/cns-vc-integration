// For Library Version: 1.84.3

declare namespace sap {
  /**
   * @SINCE 1.15.0
   *
   * See:
   * 	sap.ushell.adapters
   * 	sap.ushell.renderers
   * 	sap.ushell.services
   */
  namespace ushell {
    /**
     * @SINCE 1.15.0
     *
     * The Unified Shell container as a singleton object. This object will only be available after `sap.ushell.bootstrap()`
     * has finished.
     * See:
     * 	sap.ushell.bootstrap
     */
    //export const Container: sap.ushell.services.Container;

    /**
     * @SINCE 1.84
     *
     * Denotes display types for tiles in Spaces mode
     */
    export const DisplayFormatHint: undefined;

    /**
     * @SINCE 1.15.0
     *
     * Initializes the Unified Shell container for the given platform. This method must be called exactly once
     * in the very beginning by platform-specific code in order to bootstrap the container. As soon as the returned
     * promise has been resolved, the container will be available as a singleton object `sap.ushell.Container`.
     *
     * For convenience, platform-specific bootstrap code is available and can be easily included (**before**
     * the SAPUI5 bootstrap) by a corporate shell as follows:
     * ```javascript
     *
     * <script src="/sap/public/bc/ui5_ui5/resources/sap/ushell_abap/bootstrap/abap.js"></script>
     * <script id="sap-ui-bootstrap" src=".../sap-ui-core.js"></script>
     * ```
     *  This bootstrap code will automatically defer the initialization of SAPUI5 until the container is available.
     * This is the preferred way of bootstrapping the Unified Shell.
     *
     * Note: For SAPUI5 application projects the recommended way is to add a dependency to the "sap.ushell_abap"
     * library (`<groupId>com.sap.ushell</groupId> <artifactId>ushell_abap</artifactId>`)
     * and load the bootstrap code via the application's resources folder:
     * ```javascript
     *
     * <script src=".../resources/sap/ushell_abap/bootstrap/abap.js"></script>
     * <script id="sap-ui-bootstrap" src=".../sap-ui-core.js"></script>
     * ```
     *
     *
     * Since 1.15.0 you can provide the function `window['sap.ushell.bootstrap.callback']` for calling back
     * from this method asynchronously. SAPUI5's bootstrap is ongoing then. The same restrictions apply as for
     * the function `window['sap-ui-config']['xx-bootTask']`) when the Unified Shell container has not yet finished
     * its bootstrap. You cannot delay the bootstrap of SAPUI5 or the Unified Shell container; any errors are
     * ignored. This callback is useful for sending asynchronous back-end requests at the earliest opportunity
     * without delaying the core bootstrap of SAPUI5 and the Unified Shell container.
     * See:
     * 	sap.ushell.Container
     */
    function bootstrap(
      /**
       * the target platform, such as "abap" or "local" (Note: there is no fixed enumeration of possible platforms)
       */
      sPlatform: string,
      /**
       * the map with platform specific package names for the service adapters. You only need to specify these
       * package names if they differ from the standard name `"sap.ushell.adapters." + sPlatform`.
       */
      mAdapterPackagesByPlatform?: any
    ): any;
    /**
     * @SINCE 1.15.0
     *
     * See:
     * 	sap.ushell.renderers.standard
     */
    namespace renderers {
      namespace fiori2 {
        /**
         * @SINCE 1.15.0
         *
         * The SAPUI5 component of SAP Fiori Launchpad renderer for the Unified Shell.
         */
        class Renderer extends sap.ui.core.UIComponent {
          /**
           * This method MUST be called by the Unified Shell's container only, others MUST call `sap.ushell.Container.createRenderer("fiori2")`.
           */
          constructor();
          /**
           * @SINCE 1.30
           *
           * The launchpad states that can be passed as a parameter.
           *
           *
           * Values: App - launchpad state when running a Fiori app
           *  Home - launchpad state when the home page is open
           */
          LaunchpadState: undefined;

          /**
           * @SINCE 1.30
           * @deprecated (since 1.48) - (as a result of XMLHttpRequest spec prohibiting the sending of synchronous
           * requests). Use addUserAction instead
           *
           * Creates an action button in the User Actions Menu in the SAP Fiori launchpad, in the given launchpad
           * states (LaunchpadState).
           *
           *
           * **Example:**
           * ```javascript
           *
           * sap.ushell.Container.getRenderer("fiori2").addActionButton("sap.m.Button", {id: "testBtn2", text: "test button"}, true, true);
           * ```
           *
           *
           * This function is marked for deprecation as of version 1.48.
           *  It will continue to work as expected as long as one of the following conditions apply:
           *  1. The control instance is already created and its ID is included in the input parameter oControlProperties
           *  2. The control type resource is already loaded
           *  3. Synchronous XHR requests are supported by the browser
           *
           * See:
           * 	sap.ushell.renderers.fiori2.renderer.LaunchpadState
           *   If no launchpad state is provided, the content is added in all states.
           */
          addActionButton(
            /**
             * The (class) name of the control type to create.
             */
            controlType: string,
            /**
             * The properties that will be passed to the created control.
             */
            oControlProperties: object,
            /**
             * Specify whether to display the control. If true, the control is displayed (calls the showActionButton
             * method) according to the bCurrentState and aStates parameters. If false, the control is created but not
             * displayed (you can use showActionButton to display the control when needed).
             */
            bIsVisible: boolean,
            /**
             * If true, add the current control only to the current rendered shell state. Once the user navigates to
             * another app or back to the home page, this control will be removed.
             */
            bCurrentState: boolean,
            /**
             * List of the launchpad states (sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which to add the
             * control. Valid only if bCurrentState is set to false.
             */
            aStates: String[]
          ): object;
          /**
           * @SINCE 1.30
           *
           * Adds the given sap.ui.core.Control to the EndUserFeedback dialog.
           *  The EndUserFeedback dialog is opened via the user actions menu in the Fiori Launchpad shell header.
           */
          addEndUserFeedbackCustomUI(
            /**
             * The control to be added to the EndUserFeedback dialog.
             */
            oCustomUIContent: object,
            /**
             * Specify whether to display the control.
             */
            bShowCustomUIContent: boolean
          ): void;
          /**
           * @SINCE 1.30
           * @deprecated (since 1.48) - (as a result of XMLHttpRequest spec prohibiting the sending of synchronous
           * requests). Use addFloatingButton instead
           *
           * Creates a FloatingActionButton in Fiori launchpad, in the given launchpad states.
           *  The FloatingActionButton is rendered in the bottom right corner of the shell.
           *
           *
           * **Example:**
           * ```javascript
           *
           * sap.ushell.Container.getRenderer("fiori2").addFloatingActionButton("sap.ushell.ui.shell.ShellFloatingAction", {id: "testBtn"}, true, true);
           * ```
           *
           *
           * This function is marked for deprecation as of version 1.48.
           *  It will continue to work as expected as long as one of the following conditions apply:
           *  1. The control instance is already created and its ID is included in the input parameter oControlProperties
           *  2. The control type resource is already loaded
           *  3. Synchronous XHR requests are supported by the browser
           *
           * See:
           * 	LaunchpadState
           *   If no launchpad state is provided the content is added in all states.
           */
          addFloatingActionButton(
            /**
             * The (class) name of the control type to create.
             */
            controlType: string,
            /**
             * The properties that will be passed to the created control.
             */
            oControlProperties: object,
            /**
             * Specify whether to display the control.
             */
            bIsVisible: boolean,
            /**
             * If true, add the current control only to the current rendered shell state. Once the user navigates to
             * another app or back to the Home page, this control will be removed.
             */
            bCurrentState: boolean,
            /**
             * (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState
             * in which to add the control.
             */
            aStates: String[]
          ): object;
          /**
           * @SINCE 1.48
           * @deprecated (since 1.52)
           *
           * Creates a FloatingActionButton in Fiori launchpad, in the given launchpad states.
           *  The FloatingActionButton is rendered in the bottom right corner of the shell.
           *
           *
           * **Example:**
           * ```javascript
           *
           * sap.ushell.Container.getRenderer("fiori2").addFloatingActionButton("sap.ushell.ui.shell.ShellFloatingAction", {id: "testBtn"}, true, true);
           * ```
           *
           * See:
           * 	LaunchpadState
           *   If no launchpad state is provided the content is added in all states.
           */
          addFloatingButton(
            /**
             * Contains the required parameters for creating and showing the new control object:
             *  Properties:
             *  - {string} controlType
             *  The (class) name of the control type to create.
             *  - {object} oControlProperties
             *  The properties that will be passed to the created control.
             *  - {boolean} bIsVisible
             *  Specify whether to display the control.
             *  - {boolean} bCurrentState
             *  If true, add the current control only to the current rendered shell state.
             *  Once the user navigates to another app or back to the Home page, this control will be removed.
             *  - {String[]} aStates
             *  (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState
             * in which to add the control.
             */
            oParameters: object
          ): object;
          /**
           * @SINCE 1.30
           *
           * Creates and displays a shell header icon in Fiori launchpad, in the given launchpad states.
           *  The icon is displayed in the right side of the Fiori Launchpad shell header or in an shell header overflow
           * popup.
           *
           *
           * **Example:**
           * ```javascript
           *
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2");
           *
           *     // Create an icon button that opens a dialog
           *     oRenderer.addHeaderEndItem({
           *         id: "myTestButton",
           *         icon: "sap-icon://action-settings",
           *         tooltip: resources.i18n.getText("testButton.tooltip"),
           *         text: resources.i18n.getText("testButton.text"),
           *         ariaLabel: resources.i18n.getText("testButton.ariaLabel"),
           *         ariaHaspopup: "dialog"
           *         press: [myController.handleTestButtonPress, myController]
           *     }, true);
           *
           *     // Create a temporary link
           *     oRenderer.addHeaderEndItem({
           *         id: "myTestLink",
           *         ariaLabel: resources.i18n.getText("testLink.label"),
           *         target: "#MyTestApplication-show"
           *         icon: "sap-icon://overflow"
           *     }, true, true);
           * ```
           *
           * See:
           * 	LaunchpadState
           *   If no launchpad state is provided the content is added in all states.
           */
          addHeaderEndItem(
            /**
             * The (class) name of the control type to create. **Deprecated**: Since version 1.38. This parameter is
             * no longer supported and can be omitted.
             */
            controlType: string,
            /**
             * The properties that will be passed to the created control. The object may contain the following properties:
             *
             * 	{String} [id] - The ID of the object.
             *  {String} icon - The button icon source.
             *  {String} [text] - The button text. It is only rendered in the overflow popover but not in the shell
             * header.
             *  {String} [target] - target URI for a navigation link.
             *  {String} [ariaLabel] - Accessibility: aria-label attribute.
             *  {String} [ariaHaspopup] - Accessibility: aria-haspopup attribute.
             *  {Function} [press] - A function to be called when the button is depressed.
             */
            oControlProperties: object,
            /**
             * Specify whether to display the control.
             */
            bIsVisible: boolean,
            /**
             * If true, add the current control only to the current rendered shell state. Once the user navigates to
             * another app or back to the Home page, this control will be removed.
             */
            bCurrentState: boolean,
            /**
             * (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState
             * in which to add the control.
             */
            aStates: String[]
          ): object;
          /**
           * @SINCE 1.30
           *
           * Creates and displays an item in the header of Fiori launchpad, in the given launchpad states.
           *  The new header item will be displayed on the left-hand side of the Fiori Launchpad shell header, according
           * to the given display parameters.
           *  The new header item will be added to the right of any existing header items. The header can contain
           * a maximum of three header items.
           *
           *
           *
           * **Example:**
           * ```javascript
           *
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2");
           *     oRenderer.addHeaderItem({
           *         id: "myTestButton",
           *         ariaLabel: resources.i18n.getText("testButton.label"),
           *         ariaHaspopup: "dialog"
           *         icon: "sap-icon://action-settings",
           *         tooltip: resources.i18n.getText("testButton.tooltip"),
           *         text: resources.i18n.getText("testButton.text"),
           *         press: controller.handleTestButtonPress
           *     }, true, true);
           * ```
           *
           * See:
           * 	LaunchpadState
           */
          addHeaderItem(
            /**
             * The (class) name of the control type to create. **Deprecated**: Since version 1.38. This parameter is
             * no longer supported and can be omitted.
             */
            controlType: string,
            /**
             * The properties that will be passed to the created control. For example: `{id: "testButton"}`
             */
            oControlProperties: object,
            /**
             * Specifies whether the header item control is displayed after being created.
             *  If `true` then the control is displayed according to parameters bCurrentState and aStates.
             *  If `false` then the control is created but not displayed.
             */
            bIsVisible: boolean,
            /**
             * If `true` then the new created control is added to the current rendered shell state.
             *  When the user navigates to a different state including a different application then the control will
             * be removed.
             *  If `false` then add the control to the LaunchPadState itself.
             */
            bCurrentState: boolean,
            /**
             * (Valid only if bCurrentState is `false`)
             *  A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the control
             * is added.
             *  If no launchpad state is provided the control is added in all states.
             */
            aStates: String[]
          ): object;
          /**
           * @SINCE 1.30
           * @deprecated (since 1.48) - (as a result of XMLHttpRequest spec prohibiting the sending of synchronous
           * requests). Use addSidePaneContent instead
           *
           * Creates the Left Pane content in Fiori launchpad, in the given launchpad states.
           *
           *
           * **Example:**
           * ```javascript
           *
           * sap.ushell.Container.getRenderer("fiori2").addLeftPaneContent("sap.m.Button", {id: "testBtn", text: "Test Button"}, true, true);
           * ```
           *
           *
           * This function is marked for deprecation as of version 1.48.
           *  It will continue to work as expected as long as one of the following conditions apply:
           *  1. The control instance is already created and its ID is included in the input parameter oControlProperties
           *  2. The control type resource is already loaded
           *  3. Synchronous XHR requests are supported by the browser
           *
           * See:
           * 	LaunchpadState
           *   If no launchpad state is provided the content is added in all states.
           */
          addLeftPaneContent(
            /**
             * The (class) name of the control type to create.
             */
            controlType: string,
            /**
             * The properties that will be passed to the created control.
             */
            oControlProperties: object,
            /**
             * Specify whether to display the control.
             */
            bIsVisible: boolean,
            /**
             * If true, add the current control only to the current rendered shell state. Once the user navigates to
             * another app or back to the Home page, this control will be removed.
             */
            bCurrentState: boolean,
            /**
             * (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState
             * in which to add the control.
             */
            aStates: String[]
          ): object;
          /**
           * @SINCE 1.48
           *
           * Creates and displays a sub header control in Fiori launchpad, in the given launchpad states.
           *  The new control is displayed in FLP UI according to the given display parameters.
           *  If a sub header already exists, the new created one will replace the existing one.
           *
           *  **Example:**
           * ```javascript
           *
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2"),
           *     oAddSubHeaderProperties = {
           *         controlType : "sap.m.Bar",
           *         oControlProperties : {
           *             id: "testBar",
           *             contentLeft: [new sap.m.Button({
           *                 text: "Test SubHeader Button",
           *                 press: function () {
           *                     sap.m.MessageToast.show("Pressed");
           *                 }
           *             })
           *         },
           *         bIsVisible: true,
           *         bCurrentState: true
           *     };
           *
           * oRenderer.addShellSubHeader(oAddSubHeaderProperties);
           * ```
           */
          addShellSubHeader(
            /**
             * Contains the required parameters for creating and showing the new control object:
             *  Properties:
             *  - {string} controlType
             *  The (class) name of the control type to create.
             *  - {object} oControlProperties
             *  The properties that will be passed to the created control.
             *  - {boolean} bIsVisible
             *  Specify whether to display the control.
             *  - {boolean} bCurrentState
             *  If true, add the current control only to the current rendered shell state.
             *  Once the user navigates to another app or back to the Home page, this control will be removed.
             *  - {String[]} aStates
             *  (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState
             * in which to add the control.
             */
            oParameters: object
          ): object;
          /**
           * @SINCE 1.48
           *
           * Creates the Left Pane content in Fiori launchpad, in the given launchpad states.
           *
           *
           * **Example:**
           * ```javascript
           *
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2"),
           *     oLeftPaneContentProperties = {
           *         controlType : "sap.m.Button",
           *         oControlProperties : {
           *             id: "testBtn",
           *             text: "Test Button"
           *         },
           *         bIsVisible: true,
           *         bCurrentState: true
           *     };
           *
           * oRenderer.addSidePaneContent(oLeftPaneContentProperties);
           * ```
           *
           * See:
           * 	LaunchpadState
           *   If no launchpad state is provided the content is added in all states.
           */
          addSidePaneContent(
            /**
             * Contains the parameters that are required for creating and showing the new control object:
             *  Properties:
             *  - {string} controlType
             *  The (class) name of the control type to create.
             *  - {object} oControlProperties
             *  The properties that will be passed to the created control.
             *  - {boolean} bIsVisible
             *  Specify whether to display the control.
             *  - {boolean} bCurrentState
             *  If true, add the current control only to the current rendered shell state.
             *  Once the user navigates to another app or back to the Home page, this control will be removed.
             *  - {String[]} aStates
             *  (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState
             * in which to add the control.
             */
            oParameters: object
          ): object;
          /**
           * @SINCE 1.30
           * @deprecated (since 1.48) - (as a result of XMLHttpRequest spec prohibiting the sending of synchronous
           * requests). Use addShellSubHeader instead
           *
           * Creates and displays a sub header control in Fiori launchpad, in the given launchpad states.
           *  The new control is displayed in FLP UI according to the given display parameters.
           *  If a sub header already exists, the new created one will replace the existing one.
           *
           *
           *
           * **Example:**
           * ```javascript
           *
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2");
           * oRenderer.addSubHeader("sap.m.Bar", {id: "testBar", contentLeft: [new sap.m.Button({text: "Test SubHeader Button",
           *   press: function () {
           *     sap.m.MessageToast.show("Pressed");
           *   }})
           * ]}, true, true);
           * ```
           *
           *
           * This function is marked for deprecation as of version 1.48.
           *  It will continue to work as expected as long as one of the following conditions apply:
           *  1. The control instance is already created and its ID is included in the input parameter oControlProperties
           *  2. The control type resource is already loaded
           *  3. Synchronous XHR requests are supported by the browser
           *
           * See:
           * 	LaunchpadState
           */
          addSubHeader(
            /**
             * The (class) name of the control type to create.
             *  For example: `"sap.m.Bar"`
             */
            controlType: string,
            /**
             * The properties that will be passed to the created control.
             *  For example: `{id: "testBar"}`
             */
            oControlProperties: object,
            /**
             * Specifies whether the sub header control is displayed after being created.
             *  If `true` then the control is displayed according to parameters bCurrentState and aStates,
             *  if `false` then the control is created but not displayed.
             */
            bIsVisible: boolean,
            /**
             * If `true` then the new created control is added to the current rendered shell state.
             *  When the user navigates to another application (including the Home page) then the control will be removed.
             *  If `false` then add the control to the LaunchPadState itself.
             */
            bCurrentState: boolean,
            /**
             * (Valid only if bCurrentState is `false`)
             *  A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the control
             * is added.
             *  If no launchpad state is provided the control is added in all states.
             */
            aStates: String[]
          ): object;
          /**
           * @SINCE 1.30
           *
           * Creates a ToolAreaItem in Fiori Launchpad and adds it to the Tool Area, in the given launchpad states.
           * Once the item is added, the Tool Area is rendered on the left side on the Fiori Launchpad shell.
           *
           * **Example:**
           * ```javascript
           *
           * sap.ushell.Container.getRenderer("fiori2").addToolAreaItem({
           *   id: "testButton",
           *   icon: "sap-icon://documents",
           *   expandable: true,
           *   press: function (evt) {
           *     window.alert("Press" );
           *   },
           *   expand: function (evt) {
           *     // This function will be called on the press event of the "expand" button. The result of "expand" event in the UI must be determined by the developer
           *     window.alert("Expand" );
           *   }
           * }, true, false, ["home"]);
           * ```
           *
           * See:
           * 	sap.ushell.ui.shell.ToolAreaItem
           * 	sap.ushell.renderers.fiori2.renderer.LaunchpadState.
           */
          addToolAreaItem(
            /**
             * The properties object that will be passed to the constructor of sap.ushell.ui.shell.ToolAreaItem control.
             */
            oControlProperties: object,
            /**
             * Specify whether to display the control.
             */
            bIsVisible: boolean,
            /**
             * If `true`, add the item to the currently rendered shell. If `false`, add the item to the given LaunchPadStates
             * This causes the items to be rendered everytime the given states are active.
             */
            bCurrentState: boolean,
            /**
             * (only valid if bCurrentState is set to `false`) - An array of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState)
             * in which the controls are added. If no launchpad state is provided the items are added in all states.
             */
            aStates: String[]
          ): object;
          /**
           * @SINCE 1.48
           *
           * Creates an Action Button in Fiori launchpad, in the given launchpad states.
           *  The button will be displayed in the user actions menu, that is opened from the user button in the shell
           * header.
           *  **Example:**
           * ```javascript
           *
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2"),
           *     oAddActionButtonProperties = {
           *         controlType : "sap.m.Button",
           *         oControlProperties : {
           *             id: "exampleButton",
           *             text: "Example Button",
           *             icon: "sap-icon://refresh",
           *             press: function () {
           *                 alert("Example Button was pressed!");
           *             }
           *         },
           *         bIsVisible: true,
           *         bCurrentState: true
           *     };
           * oRenderer.addUserAction(oAddActionButtonProperties);
           * ```
           *
           * See:
           * 	LaunchpadState
           *   If no launchpad state is provided the content is added in all states.
           */
          addUserAction(
            /**
             * Contains the required parameters for creating and showing the new control object:
             *  Properties:
             *  - {string} controlType
             *  The (class) name of the control type to create.
             *  - {object} oControlProperties
             *  The properties that will be passed to the created control.
             *  - {boolean} bIsVisible
             *  Specify whether to display the control.
             *  - {boolean} bCurrentState
             *  If true, add the current control only to the current rendered shell state.
             *  Once the user navigates to another app or back to the Home page, this control will be removed.
             *  - {String[]} aStates
             *  (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState
             * in which to add the control.
             */
            oParameters: object
          ): object;
          /**
           * @SINCE 1.30
           *
           * Adds an entry to the User Preferences dialog box including the UI control that appears when the user
           * clicks the new entry, and handling of User Preferences actions such as SAVE and CANCEL.
           *
           * **Example:**
           * ```javascript
           *
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2");
           * var oEntry = {
           *   title: "title",
           *   value: function() {
           *       return jQuery.Deferred().resolve("entryTitleToBeDisplayed");
           *   },
           *   content: function() {
           *       return jQuery.Deferred().resolve(new sap.m.Button("userPrefEntryButton", {text: "Button"}));
           *   },
           *   onSave: function() {
           *       return jQuery.Deferred().resolve();
           *   }
           *   };
           * oRenderer.addUserPreferencesEntry(oEntry);
           * ```
           */
          addUserPreferencesEntry(
            /**
             * The data of the new added User Preference entry Including:
             * 	{String} entryHelpID (Optional) - The ID of the object.
             *  {String} title - The title of the entry to be presented in the list in the User Preferences dialog
             * box.
             *  We recommend using a string from the translation bundle.
             *  {String}/{Function} value - A string to be presented as the value of the entry
             *  OR a function to be called which returns a {jQuery.Deferred.promise} object.
             *  {Function} content - A function to be called that returns a {jQuery.Deferred.promise} object
             *  which consists of a {sap.ui.core.Control} to be displayed in a follow-on dialog box. A SAPUI5 view instance
             * can also be returned. The functions is called on each time the user opens the User Preferences dialog
             * box. {Function} onSave - A function to be called which returns a {jQuery.Deferred.promise} object
             * when the user clicks Save in the User Preferences dialog box.
             *  If an error occurs, pass the error message via the {jQuery.Deferred.promise} object. Errors are displayed
             * in the log.
             *  {Function} onCancel - A function to be called that closes the User Preferences dialog box without
             * saving any changes.
             *  {Boolean} provideEmptyWrapper - Experimental. Set this value to true if you want that your content
             * is displayed without the standard header
             */
            entryObject: object
          ): void;
          /**
           * Creates a new subclass of class sap.ushell.renderers.fiori2.Renderer with name `sClassName` and enriches
           * it with the information contained in `oClassInfo`.
           *
           * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.UIComponent.extend}.
           */
          // @ts-ignore
          static extend(
            /**
             * Name of the class being created
             */
            sClassName: string,
            /**
             * Object literal with information about the class
             */
            oClassInfo?: object,
            /**
             * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
             * used by this class
             */
            FNMetaImpl?: Function
          ): Function;
          /**
           * @SINCE 1.37
           *
           * This method returns the current state of the Viewport Container control.
           */
          getCurrentViewportState(): void;
          /**
           * Returns a metadata object for class sap.ushell.renderers.fiori2.Renderer.
           */
          // @ts-ignore
          static getMetadata(): sap.ui.core.ComponentMetadata;
          /**
           * @SINCE 1.30
           *
           * Hides an action button from the User Actions Menu in the SAP Fiori launchpad, in the given launchpad
           * states (LaunchpadState). The removed button will not be destroyed.
           *
           *  This API is meant to be used for custom elements in the SAP Fiori launchpad. We do not recommend using
           * it on standard launchpad elements, as this may interfere with the standard launchpad functionality.
           * See:
           * 	sap.ushell.renderers.fiori2.renderer.LaunchpadState.
           *   If no launchpad state is provided, the content is hidden in all states.
           */
          hideActionButton(
            /**
             * IDs of the button controls that should hidden.
             */
            aIds: String[],
            /**
             * If true, removes the current control only from the current rendered shell state.
             */
            bCurrentState: boolean,
            /**
             * A list of the launchpad states in which to hide the control. Valid only if bCurrentState is set to false.
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           * @deprecated (since 1.52)
           *
           * Hide the given sap.ushell.ui.shell.ShellFloatingAction from Fiori Launchpad, in the given launchpad states.
           * The removed control will not be destroyed.
           *
           *  This API is meant to be used for implementing custom elements in the SAP Fiori launchpad. We do not
           * recommend using it on a standard launchpad element, as this may interfere with the standard launchpad
           * functionality.
           * See:
           * 	LaunchpadState
           *   If no launchpad state is provided the content is removed in all states.
           */
          hideFloatingActionButton(
            /**
             * the Ids of the sap.ushell.ui.shell.ShellFloatingAction to remove.
             */
            aIds: String[],
            /**
             * if true, remove the current control only from the current rendered shell state.
             */
            bCurrentState: boolean,
            /**
             * list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control. (Only
             * valid if bCurrentState is set to false)
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           *
           * Hide the given sap.ushell.ui.shell.ShellHeadItem from Fiori Launchpad, in the given launchpad states.
           * The removed control will not be destroyed.
           *
           *  This API is meant to be used for implementing custom elements in the SAP Fiori launchpad. We do not
           * recommend using it on a standard launchpad element, as this may interfere with the standard launchpad
           * functionality.
           * See:
           * 	LaunchpadState
           *   If no launchpad state is provided the content is removed in all states.
           */
          hideHeaderEndItem(
            /**
             * the Ids of the sap.ushell.ui.shell.ShellHeadItem to remove.
             */
            aIds: String[],
            /**
             * if true, remove the current control only from the current rendered shell state.
             */
            bCurrentState: boolean,
            /**
             * list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control. (Only
             * valid if bCurrentState is set to false)
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           *
           * Hide the given sap.ushell.ui.shell.ShellHeadItem from Fiori Launchpad, in the given launchpad states.
           * The removed control will not be destroyed.
           *
           *  This API is meant to be used for implementing custom elements in the SAP Fiori launchpad. We do not
           * recommend using it on a standard launchpad element, as this may interfere with the standard launchpad
           * functionality.
           * See:
           * 	LaunchpadState
           *   If no launchpad state is provided the content is removed in all states.
           */
          hideHeaderItem(
            /**
             * the Ids of the sap.ushell.ui.shell.ShellHeadItem to remove.
             */
            aIds: String[],
            /**
             * if true, remove the current control only from the current rendered shell state.
             */
            bCurrentState: boolean,
            /**
             * list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control. (Only
             * valid if bCurrentState is set to false)
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           *
           * Hide the given control from Fiori Launchpad, in the given launchpad states. The removed control will
           * not be destroyed.
           *
           *  This API is meant to be used for implementing custom elements in the SAP Fiori launchpad. We do not
           * recommend using it on a standard launchpad element, as this may interfere with the standard launchpad
           * functionality.
           * See:
           * 	LaunchpadState
           *   If no launchpad state is provided the content is removed in all states.
           */
          hideLeftPaneContent(
            /**
             * the Ids of the controls to remove.
             */
            aIds: String[],
            /**
             * if true, remove the current control only from the current rendered shell state.
             */
            bCurrentState: boolean,
            /**
             * list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control. (Only
             * valid if bCurrentState is set to false)
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           *
           * Hide the given control from the Fiori Launchpad sub header, in the given launchpad states. The removed
           * control will not be destroyed.
           *
           *  This API is meant to be used for implementing custom elements in the SAP Fiori launchpad. We do not
           * recommend using it on a standard launchpad element, as this may interfere with the standard launchpad
           * functionality.
           * See:
           * 	LaunchpadState
           *   If no launchpad state is provided the content is removed in all states.
           */
          hideSubHeader(
            /**
             * the Ids of the controls to remove.
             */
            aIds: String[],
            /**
             * if true, remove the current control only from the current rendered shell state.
             */
            bCurrentState: boolean,
            /**
             * list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control. (Only
             * valid if bCurrentState is set to false)
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           *
           * If exists, this method will remove the footer from the Fiori Launchpad.
           *
           *  This API is meant to be used for implementing custom elements in the SAP Fiori launchpad. We do not
           * recommend using it on a standard launchpad element, as this may interfere with the standard launchpad
           * functionality.
           */
          removeFooter(): void;
          /**
           * @SINCE 1.30
           *
           * Remove the given Tool Area Item from Fiori Launchpad, in the given launchpad states. This API is meant
           * to be used for implementing custom elements in the SAP Fiori launchpad. We do not recommend using it
           * on a standard launchpad element, as this may interfere with the standard launchpad functionality.
           * See:
           * 	sap.ushell.renderers.fiori2.renderer.LaunchpadState.
           */
          removeToolAreaItem(
            /**
             * A single ID or an array of IDs to remove from the Tool Area.
             */
            vIds: string | String[],
            /**
             * If `true`, remove the items from the currently rendered shell. If `false`, remove the items from the
             * LaunchPadState itself, causing the items to be removed everytime the given states are active.
             */
            bCurrentState: boolean,
            /**
             * (only valid if bCurrentState is set to `false`) - An array of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState)
             * from which the controls are removed. If no launchpad state is provided the items are removed from all
             * states.
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           *
           * Displays the given sap.m.Bar as the footer of the Fiori launchpad shell.
           *  The footer will be displayed in all states.
           *
           *
           * **Example:**
           * ```javascript
           *
           * var bar = new sap.m.Bar({contentLeft: [new sap.m.Button({text: "Test Footer Button",
           *   press: function () {
           *     sap.m.MessageToast.show("Pressed");
           *   }})
           * ]});
           * var renderer = sap.ushell.Container.getRenderer("fiori2");
           * renderer.setFooter(bar);
           * ```
           */
          setFooter(
            /**
             * sap.m.Bar, the control to be added as the footer of the Fiori Launchpad
             */
            oFooter: Object
          ): void;
          /**
           * @SINCE 1.42
           * @deprecated (since 1.48) - (as a result of XMLHttpRequest spec prohibiting the sending of synchronous
           * requests). Use setShellFooter instead
           *
           * Creates and displays an SAPUI5 control as the footer of the Fiori launchpad shell.
           *  The footer will be displayed in all states.
           *  Previously created footer will be removed.
           *
           *
           * **For example, using the sap.m.Bar control:**
           * ```javascript
           *
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2");
           * oRenderer.setFooterControl("sap.m.Bar", {id: "testBar", contentLeft: [new sap.m.Button({text: "Test Footer Button",
           *   press: function () {
           *     sap.m.MessageToast.show("Pressed");
           *   }})
           * ]});
           * ```
           *
           *
           * This function is marked for deprecation as of version 1.48.
           *  It will continue to work as expected as long as one of the following conditions apply:
           *  1. The control instance is already created and its ID is included in the input parameter oControlProperties
           *  2. The control type resource is already loaded
           *  3. Synchronous XHR requests are supported by the browser
           */
          setFooterControl(
            /**
             * The (class) name of the control type to create.
             *  For example: `"sap.m.Bar"`
             */
            controlType: string,
            /**
             * The properties that will be passed to the created control.
             *  For example: `{id: "testBar"}`
             */
            oControlProperties: object
          ): object;
          /**
           * @SINCE 1.30
           *
           * Sets the title in the Fiori Launchpad shell header.
           */
          setHeaderTitle(
            /**
             * The title to be displayed in the Fiori Launchpad shell header
             */
            sTitle: string
          ): void;
          /**
           * @SINCE 1.38
           *
           * Sets the header visibility accrding to the given value and shell states. (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).
           *
           * **Example:**
           * ```javascript
           *
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2");
           * oRenderer.setHeaderVisibility(false, false, ["home", "app"]);
           * ```
           *
           * See:
           * 	LaunchpadState
           */
          setHeaderVisibility(
            /**
             * The visibility of the header
             */
            bVisible: boolean,
            /**
             * If `true` then the visibility is set only to the current rendered shell state.
             *  When the user navigates to another application (including the Home page) then the visibility flag is
             * reset.
             *  If `false` then set the visibility according to the states provided in the aState parameter.
             */
            bCurrentState: boolean,
            /**
             * (Valid only if bCurrentState is `false`)
             *  A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the header
             * visibility flag should be set.
             *  If no launchpad state is provided the visibility flag is set for all states.
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           *
           * Sets the visibility of the left pane in the Fiori Launchpad shell, in the given launchpad state @see
           * LaunchpadState
           */
          setLeftPaneVisibility(
            /**
             * LaunchpadState in which to show/hide the left pane
             */
            sLaunchpadState: string,
            /**
             * specif whether to display the left pane or not
             */
            bVisible: boolean
          ): void;
          /**
           * @SINCE 1.48
           *
           * Creates and displays an SAPUI5 control as the footer of the Fiori launchpad shell.
           *  The footer will be displayed in all states.
           *  Previously created footer will be removed.
           *
           *
           * **For example, using the sap.m.Bar control:**
           * ```javascript
           *
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2"),
           *   oFooterControlProperties = {
           *     controlType : "sap.m.Bar",
           *     oControlProperties : {
           *       id: "testBar",
           *       contentLeft: [new sap.m.Button({
           *         text: "Test Footer Button",
           *         press: function () {
           *           sap.m.MessageToast.show("Pressed");
           *         }
           *       })]
           *     }
           *   };
           * oRenderer.setShellFooter(oFooterControlProperties);
           * ```
           */
          setShellFooter(
            /**
             * Contains the required parameters for creating and showing the new control object:
             *  Properties:
             *  - {string} controlType
             *  The (class) name of the control type to create, for example: `"sap.m.Bar"`
             *  - {object} oControlProperties
             *  The properties that will be passed to the created control, for example: `{id: "testBar"}`
             */
            oParameters: object
          ): object;
          /**
           * @SINCE 1.30
           *
           * Displays action buttons in the User Actions Menu in the SAP Fiori launchpad, in the given launchpad states
           * (LaunchpadState). (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).
           *  If no launchpad state is provided the content is displayed in all states.
           *  The user actions menu is opened via the button on the right hand side of the shell header.
           *
           *
           * **Example:**
           * ```javascript
           *
           * var button1 = new sap.m.Button();
           * var renderer = sap.ushell.Container.getRenderer("fiori2");
           * renderer.showActionButton([button1.getId()], false, ["home", "app"]);
           * ```
           *
           * See:
           * 	sap.ushell.renderers.fiori2.renderer.LaunchpadState.
           *   If no launchpad state is provided, the content is added in all states.
           */
          showActionButton(
            /**
             * List of ID elements to that should be added to the User Actions Menu options bar.
             */
            aIds: String[],
            /**
             * If true, add the created control to the current rendered shell state. When the user navigates to a different
             * state, or to a different application, then the control is removed. If false, the control is added to
             * the LaunchpadState.
             */
            bCurrentState: boolean,
            /**
             * List of the launchpad states (sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which to add the
             * aIds. Valid only if bCurrentState is set to false.
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           * @deprecated (since 1.52)
           *
           * Displays FloatingActionButton on the bottom right corner of the Fiori launchpad, in the given launchpad
           * states. The FloatingActionButton is rendered in the bottom right corner of the shell.
           *  (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).
           *  If no launchpad state is provided the content is displayed in all states.
           *
           *
           * **Example:**
           * ```javascript
           *
           * var button1 = new sap.ushell.ui.shell.ShellFloatingAction();
           * var renderer = sap.ushell.Container.getRenderer("fiori2");
           * renderer.showFloatingActionButton([button1.getId()], true);
           * ```
           */
          showFloatingActionButton(
            /**
             * List of ID elements to add to the user actions menu.
             */
            aIds: String[],
            /**
             * if true, add the current Buttons only to the current instance of the rendering of the shell. if false,
             * add the Buttons to the LaunchPadState itself.
             */
            bCurrentState: boolean,
            /**
             * (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.renderer.LaunchpadState
             * in which to add the aIds.
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           *
           * Displays HeaderItems on the right side of the Fiori launchpad shell header, in the given launchpad states
           * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).
           *  If no launchpad state is provided the content is displayed in all states.
           *  The shell header can display the user HeaderItem, and just one more HeaderItem.
           *  If this method is called when the right side of the header is full, this method will not do anything.
           *
           *
           * **Example:**
           * ```javascript
           *
           * var button1 = new sap.ushell.ui.shell.ShellHeadItem();
           * var renderer = sap.ushell.Container.getRenderer("fiori2");
           * renderer.showHeaderEndItem ([button1.getId()], false, ["home", "app"]);
           * ```
           */
          showHeaderEndItem(
            /**
             * List of ID elements to add to the shell header.
             */
            aIds: String[],
            /**
             * if true, add the current HeaderItems only to the current instance of the rendering of the shell. if false,
             * add the HeaderItems to the LaunchPadState itself.
             */
            bCurrentState: boolean,
            /**
             * (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.renderer.LaunchpadState
             * in which to add the aIds.
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           *
           * Creates and displays one or more HeaderItem controls according to the given control IDs and Shell states
           *  (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).
           *
           *  The HeaderItem controls will be displayed on the left side of the Fiori Launchpad shell header according
           * to the given display parameters.
           *  There can be up to three header items. If the number of existing header items plus the given ones exceeds
           * 3, then the operation fails and no new header items are created.
           *
           *
           * **Example:**
           * ```javascript
           *
           * var button1 = new sap.ushell.ui.shell.ShellHeadItem();
           * var button2 = new sap.ushell.ui.shell.ShellHeadItem();
           * var renderer = sap.ushell.Container.getRenderer("fiori2");
           * renderer.showHeaderItem ([button1.getId(), button2.getId()], false, ["home", "app"]);
           * ```
           *
           * See:
           * 	LaunchpadState.
           */
          showHeaderItem(
            /**
             * IDs Array of headerItem controls that should be added to the shell header
             */
            aIds: String[],
            /**
             * If `true` then the new created controls are added to the current rendered shell state.
             *  When the user navigates to another application (including the Home page) then the controls will be removed.
             *  If `false` then the controls are added to the LaunchPadState itself.
             */
            bCurrentState: boolean,
            /**
             * (Valid only if bCurrentState is `false`)
             *  A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the controls
             * are added.
             *  If no launchpad state is provided the controls are added in all states.
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           *
           * Displays one or more sub header controls according to the given control IDs and shell states.
           *  (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).
           *
           *  A sub header is placed in a container, located directly below the main Fiori launchpad shell header.
           *
           *
           * **Example:**
           * ```javascript
           *
           * var bar = new sap.m.Bar({id: "testBar", contentLeft: [new sap.m.Button({text: "Test SubHeader Button",
           *   press: function () {
           *     sap.m.MessageToast.show("Pressed");
           *   }})
           * ]});
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2");
           * oRenderer.showSubHeader([bar.getId()], false, ["home", "app"]);
           * ```
           *
           * See:
           * 	LaunchpadState
           */
          showSubHeader(
            /**
             * Array of sub header control IDs to be added
             */
            aIds: String[],
            /**
             * If `true` then the new created controls are added only to the current rendered shell state.
             *  When the user navigates to another application (including the Home page) then the controls will be removed.
             *  If `false` then add the control to the LaunchPadState itself.
             */
            bCurrentState: boolean,
            /**
             * (Valid only if bCurrentState is `false`)
             *  A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the controls
             * are added.
             *  If no launchpad state is provided the controls are added in all states.
             */
            aStates: String[]
          ): void;
          /**
           * Sets the ToolArea visibility
           */
          showToolArea(
            /**
             * LaunchpadState in which to show/hide the ToolArea @see LaunchpadState
             */
            sLaunchpadState?: String,
            /**
             * specifies whether to display the ToolArea or not
             */
            bVisible?: boolean
          ): void;
          /**
           * @SINCE 1.30
           *
           * Displays ToolAreaItems on the left side of the Fiori Launchpad shell, in the given launchpad states.
           *
           * **Example:**
           * ```javascript
           *
           * var renderer = sap.ushell.Container.getRenderer("fiori2"),
           *     button1 = new sap.ushell.ui.shell.ToolAreaItem({ icon: "sap-icon://wrench" });
           * renderer.showToolAreaItem(button1.getId(), false, ["home", "app"]);
           * ```
           *
           * See:
           * 	sap.ushell.renderers.fiori2.renderer.LaunchpadState.
           */
          showToolAreaItem(
            /**
             * A single ID or an array of IDs to add to the Tool Area.
             */
            vIds: string | String[],
            /**
             * If `true`, add the items to the currently rendered shell. If `false`, add the items to the LaunchPadState
             * itself, causing the items to be rendered everytime the given states are active.
             */
            bCurrentState: boolean,
            /**
             * (only valid if bCurrentState is set to `false`) - An array of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState)
             * in which the controls are added. If no launchpad state is provided the items are added in all states.
             */
            aStates: String[]
          ): void;
          /**
           * @SINCE 1.30
           *
           * Creates and displays an item in the header of Fiori launchpad, in the given launchpad states.
           *  The new header item will be displayed on the left-hand side of the Fiori Launchpad shell header, according
           * to the given display parameters.
           *  The new header item will be added to the right of any existing header items. The header can contain
           * a maximum of three header items.
           *
           *
           *
           * **Example:**
           * ```javascript
           *
           * var oRenderer = sap.ushell.Container.getRenderer("fiori2");
           *     oRenderer.addHeaderItem({
           *         id: "myTestButton",
           *         ariaLabel: resources.i18n.getText("testButton.label"),
           *         ariaHaspopup: "dialog"
           *         icon: "sap-icon://action-settings",
           *         tooltip: resources.i18n.getText("testButton.tooltip"),
           *         text: resources.i18n.getText("testButton.text"),
           *         press: controller.handleTestButtonPress
           *     }, true, true);
           * ```
           *
           * See:
           * 	LaunchpadState
           */
          addHeaderItem(
            /**
             * The properties that will be passed to the created control. For example: `{id: "testButton"}`
             */
            oControlProperties: object,
            /**
             * Specifies whether the header item control is displayed after being created.
             *  If `true` then the control is displayed according to parameters bCurrentState and aStates.
             *  If `false` then the control is created but not displayed.
             */
            bIsVisible: boolean,
            /**
             * If `true` then the new created control is added to the current rendered shell state.
             *  When the user navigates to a different state including a different application then the control will
             * be removed.
             *  If `false` then add the control to the LaunchPadState itself.
             */
            bCurrentState: boolean,
            /**
             * (Valid only if bCurrentState is `false`)
             *  A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the control
             * is added.
             *  If no launchpad state is provided the control is added in all states.
             */
            aStates: String[]
          ): object;
        }
      }
    }
    /**
     * @SINCE 1.15.0
     *
     * See:
     * 	sap.ushell.services.Container
     */
    namespace services {
      /**
       * @SINCE 1.62.0
       * @EXPERIMENTAL
       */
      export const ContentExtensionAdapterFactory: undefined;

      /**
       * @SINCE 1.15.0
       *
       * The unified shell's AppConfiguration service.
       */
      class AppConfiguration {
        /**
         * The Unified Shell App configuration service as a singleton object.
         */
        constructor();

        /**
         * Sets the application screen size to full width
         */
        setApplicationFullWidth(
          /**
           * A Boolean value indicating if the application fills the full width of the screen
           */
          bValue: boolean
        ): void;
      }
      /**
       * @SINCE 1.38
       */
      class AppLifeCycle {
        /**
         * The Unified Shell's AppLifeCycle service This method MUST be called by the Unified Shell's container
         * only, others MUST call `sap.ushell.Container.getService("AppLifeCycle")`. Constructs a new instance of
         * the AppLifeCycle service.
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor(
          /**
           * The service adapter for the AppLifeCycle service, as already provided by the container
           */
          oAdapter: object,
          /**
           * interface
           */
          oContainerInterface: object,
          /**
           * Service instantiation
           */
          sParameter: string,
          /**
           * service configuration (not in use)
           */
          oConfig: object
        );

        /**
         * @SINCE 1.38
         *
         * Attaches an event handler for the appLoaded event. This event handler will be triggered each time an
         * application has been loaded.
         */
        attachAppLoaded(
          /**
           * An object that will be passed to the handler along with the event object when the event is fired.
           */
          oData: object,
          /**
           * The handler function to call when the event occurs.
           */
          fnFunction: Function,
          /**
           * The object that wants to be notified when the event occurs (this context within the handler function).
           */
          oListener: object
        ): void;
        /**
         * @SINCE 1.38
         *
         * Detaches an event handler from the EventProvider.
         */
        detachAppLoaded(
          /**
           * The handler function that has to be detached from the EventProvider.
           */
          fnFunction: Function,
          /**
           * The object that wanted to be notified when the event occurred
           */
          oListener: object
        ): void;
        /**
         * @SINCE 1.38
         *
         * Returns information about the currently running application.
         *
         * The function returns an object with following parameters:
         * 	 -  applicationType: “UI5|WDA|NWBC|URL|TR”
         * 	 -  componentInstance: reference to component (only for applicationType "UI5").
         * 	 -  homePage: `true` when root intent (normally #Shell-home) or Appfinder (#Shell-appfinder) is currently
         * 			displayed.
         * 	 -  getTechnicalParameter: `function` that returns the value of a technical parameter for the given
         * 			application. This method is for SAP internal usage only.
         * 	 -  getIntent: `function` that returns a `Promise` that resolves with the current shell hash as an `Object`.
         * 			See {@link sap.ushell.services.URLParsing#parseShellHash} for details. This property is for SAP-internal
         * 			use only!
         * 	 -  getInfo: `function` that is called with an `Array` with following optional elements of type `String`
         *
         * 	 ` productName ` A human readable free form text maintained on the platform where FLP runs, and identifying
         * the current product.
         * 	 -  ` theme ` Current FLP theme. Includes the path to the theme resources if the theme is not an sap
         * 			theme (does not start with sap_)
         * 	 -  ` languageTag ` Current Language (BCP47 format)
         * 	 -  ` appIntent ` Intent that was used to launch the application (including parameters)
         * 	 -  ` appFrameworkId `ID of the framework
         * 	 -  ` technicalAppComponentId ` Identifier of the component that implements the base application.
         * 	 -  ` technicalAppId ` Identifier of the application instance. This acts as a sub-property of technicalAppComponentId
         * 			that gives more details about the specific application instance.
         * 	 -  ` appId ` Universal stable logical identifier of the application across the whole content.
         * 	 -  ` appVersion ` Version of the app
         * 	 -  ` appSupportInfo ` The name of an organizational component that handles support incidents.
         * 	 -  ` appFrameworkVersion ` Version of the framework
         * 	 -  ` appHelpVersion ` Allows to identify the desired in-app help version.  The `function` returns
         * 			a `Promise` that resolves with an `Object` with properties corresponding to the elements of the `Array`
         * 			passed as input. Each of these properties holds its value or undefined if not configured.
         *
         * **Note:** Return value is only valid after app is loaded. See {@link #attachAppLoaded} for details. Before
         * an app is loaded, `undefined` is returned.
         */
        getCurrentApplication(): object | undefined;
      }
      /**
       * @SINCE 1.15.0
       *
       * The unified shell's bookmark service, which allows you to create shortcuts on the user's home page.
       */
      class Bookmark {
        /**
         * This method MUST be called by the Unified Shell's container only, others MUST call `sap.ushell.Container.getService("Bookmark")`.
         * Constructs a new instance of the bookmark service.
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor();

        /**
         * @SINCE 1.15.0
         *
         * Adds a bookmark tile to one of the user's classic homepage groups or to multiple provided content nodes.
         * See:
         * 	sap.ushell.services.URLParsing#getShellHash
         */
        addBookmark(
          /**
           * Bookmark parameters. In addition to title and URL, a bookmark might allow additional settings, such as
           * an icon or a subtitle. Which settings are supported depends on the environment in which the application
           * is running. Unsupported parameters will be ignored.
           */
          oParameters: {
            /**
             * The title of the bookmark.
             */
            title: string;
            /**
             * The URL of the bookmark. If the target application shall run in the Shell, the URL has to be in the format
             * `"#SO-Action~Context?P1=a&P2=x&/route?RPV=1"`.
             */
            url: string;
            /**
             * The optional icon URL of the bookmark (e.g. `"sap-icon://home"`).
             */
            icon?: string;
            /**
             * The information text of the bookmark. This property is not relevant if CDM is used.
             */
            info?: string;
            /**
             * The subtitle of the bookmark.
             */
            subtitle?: string;
            /**
             * The URL to a REST or OData service that provides some dynamic information for the bookmark.
             */
            serviceUrl?: string;
            /**
             * The refresh interval for the `serviceUrl` in seconds.
             */
            serviceRefreshInterval?: string;
            /**
             * The unit for the number retrieved from `serviceUrl`. This property is not relevant in the CDM context.
             */
            numberUnit?: string;
          },
          /**
           * Either a legacy launchpad home page group, one content node or an array of content nodes. (@see Bookmark#getContentNodes)
           * If not provided, the bookmark will be added to the default group if spaces mode is not active or to the
           * default page if spaces mode is active.
           */
          vContainer?: any
        ): any;
        /**
         * @SINCE 1.21.2
         *
         * Adds the catalog tile with the given ID to given group. The catalog tile is looked up in the legacy SAP
         * HANA catalog unless data to look up a remote catalog is provided.
         */
        addCatalogTileToGroup(
          /**
           * The ID of the tile within the catalog
           */
          sCatalogTileId: string,
          /**
           * The id of the group. If not given, the tile is added to the default group
           */
          sGroupId?: string,
          /**
           * The data to identify the catalog containing the tile with the given ID
           */
          oCatalogData?: {
            /**
             * The remote catalog's base URL such as "/sap/hba/apps/kpi/s/odata/hana_chip_catalog.xsodata/"
             */
            baseUrl: string;
            /**
             * The remote catalog's id on the remote system such as "HANA_CATALOG"
             */
            remoteId: string;
          }
        ): any;
        /**
         * @SINCE 1.17.1
         *
         * Counts **all** bookmarks pointing to the given URL from all of the user's pages. You can use this method
         * to check if a bookmark already exists.  This is a potentially asynchronous operation in case the user's
         * pages have not yet been loaded completely!
         * See:
         * 	#addBookmark
         */
        countBookmarks(
          /**
           * The URL of the bookmarks to be counted, exactly as specified to {@link #addBookmark}.
           */
          sUrl: string
        ): any;
        /**
         * @SINCE 1.17.1
         *
         * Deletes **all** bookmarks pointing to the given URL from all of the user's pages.
         * See:
         * 	#addBookmark
         * 	#countBookmarks
         */
        deleteBookmarks(
          /**
           * The URL of the bookmarks to be deleted, exactly as specified to {@link #addBookmark}.
           */
          sUrl: string
        ): any;
        /**
         * @SINCE 1.17.1
         *
         * Updates **all** bookmarks pointing to the given URL on all of the user's pages with the given new parameters.
         * Parameters which are omitted are not changed in the existing bookmarks.
         * See:
         * 	#addBookmark
         * 	#countBookmarks
         * 	#deleteBookmarks
         */
        updateBookmarks(
          /**
           * The URL of the bookmarks to be updated, exactly as specified to {@link #addBookmark}. In case you need
           * to update the URL itself, pass the old one here and the new one as `oParameters.url`!
           */
          sUrl: string,
          /**
           * The bookmark parameters as documented in {@link #addBookmark}.
           */
          oParameters: object
        ): any;
      }
      /**
       * @SINCE 1.64.0
       *
       * The unified shell's Configuration service, which allows to attach to **selected** launchpad configuration
       * settings and their value changes.
       */
      class Configuration {
        /**
         * This method MUST be called by the Unified Shell's container only, others MUST call `sap.ushell.Container.getService("Configuration")`.
         * Constructs a new Configuration service.
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor();
      }
      /**
       * @SINCE 1.15.0
       *
       * The Unified Shell's container which manages renderers, services, and adapters.
       */
      class Container {
        /**/
        constructor();
        /**
         * @SINCE 1.15.0
         *
         * Logs out the current user from all relevant back-end systems, including the logon system itself. This
         * member represents the default native implementation of logout. If SessionHandler was created, we register
         * the alternate logout function using registerLogout function.
         */
        logout: undefined;

        /**
         * @SINCE 1.15.0
         *
         * Adds a system to the list of remote systems currently in use. On logout this list is processed and performs
         * a logout for each system via the ContainerAdapter specific for its platform.
         */
        addRemoteSystem(
          /**
           * Remote system to be added.
           */
          oRemoteSystem: sap.ushell.System
        ): void;
        /**
         * @SINCE 1.19.1
         *
         * Attaches a listener to the logout event. In case the bAsyncFunction parameter is true, the fnFunction
         * must return a promise. FLP will wait for the promise to be resolved before doing the actual logout.
         */
        attachLogoutEvent(
          /**
           * Event handler to be attached.
           */
          fnFunction: Function,
          /**
           * Whether the function returns a Promise to wait for its resolvent (since 1.81.0).
           */
          bAsyncFunction: boolean
        ): void;
        /**
         * @SINCE 1.34.1
         *
         * Attaches a listener to the rendererCreated event.
         */
        attachRendererCreatedEvent(
          /**
           * Event handler to be attached. If a renderer is created, this function is called with a parameter of instance
           * `sap.ui.base.Event`. The event object provides the instance of the created renderer as parameter "renderer".
           * If the renderer is a SAPUI5 UI component (i.e. extend `sap.ui.core.UIComponent`), the event parameter
           * returns the component instance, i.e. it unwraps the renderer component from its component container.
           */
          fnFunction: Function
        ): void;
        /**
         * @SINCE 1.21.2
         *
         * Cancels the logon procedure in the current frame, if any. This MUST be used by the logon frame provider
         * in case the user wants to close the logon frame for good. It will report "Authentication cancelled" and
         * let all pending requests for the current realm fail. As a side-effect, it also calls `destroy` on the
         * logon frame provider.
         * See:
         * 	sap.ushell.services.Container#setLogonFrameProvider
         */
        cancelLogon(): void;
        /**
         * @SINCE 1.15.0
         * @EXPERIMENTAL (since 1.55.0)
         *
         * Creates a new renderer instance for the given renderer name.
         *
         * Names without a dot are interpreted as package names within the default naming convention and will be
         * expanded to `"sap.ushell.renderers." + sRendererName + ".Renderer"`. Names containing a dot are used
         * "as is".
         *
         * The resulting name must point to a SAPUI5 object which is first required and then created (constructor
         * call without arguments). The object must be either a control (i.e. extend `sap.ui.core.Control`) or a
         * UI component (i.e. extend `sap.ui.core.UIComponent`), which is then automatically wrapped into a `sap.ui.core.ComponentContainer`
         * control by this method. This `sap.ui.core.ComponentContainer` is created with `height` and `width` set
         * to "100%" to accommodate the complete available space.
         *
         * The returned renderer is supposed to be added to a direct child (for example `DIV`) of the `BODY` of
         * the page and there should be no other parts of the page consuming space outside the renderer. Use CSS
         * class `sapUShellFullHeight` at `HTML`, `BODY` and at the element to which the renderer is added to allow
         * the renderer to use 100% height.
         */
        createRenderer(
          /**
           * The renderer name, such as "standard" or "acme.foo.bar.MyRenderer"; it is taken from the configuration
           * property `defaultRenderer` if not given here.
           */
          sRendererName?: string,
          /**
           * If true, the renderer is created asynchronously and a Promise is returned.
           */
          bAsync?: boolean
        ): any;
        /**
         * @SINCE 1.67.0
         *
         * Deregister the work protection dirty callback function. See registerDirtyStateProvider for more information.
         * Only the last registered function will be deregistered (in case it was registered multiple times).
         */
        deregisterDirtyStateProvider(
          /**
           * function for determining the state of the application
           */
          fnDirty: Function
        ): void;
        /**
         * @SINCE 1.19.1
         *
         * Detaches a listener from the logout event.
         */
        detachLogoutEvent(
          /**
           * Event handler to be detached.
           */
          fnFunction: Function
        ): void;
        /**
         * @SINCE 1.34.1
         *
         * Detaches a listener from the rendererCreated event.
         */
        detachRendererCreatedEvent(
          /**
           * Event handler to be detached.
           */
          fnFunction: Function
        ): void;
        /**
         * @SINCE 1.27.0
         *
         * If the dirty state was set to 'false' using 'setDirtyFlag' the registered dirty state provider methods
         * get called to determine the actual dirty state. The determined dirty state is then returned.
         *
         * However, if the dirty state was previously set to 'true' using 'setDirtyFlag' the registered dirty state
         * provider methods are ignored and the function simply returns 'true'.
         */
        getDirtyFlag(): boolean;
        /**
         * @SINCE 1.21.1
         *
         * Returns the global dirty state.
         *
         * All open UShell browser windows for the same origin are asked about their global dirty state.
         */
        getGlobalDirty(): any;
        /**
         * @SINCE 1.15.0
         * @deprecated (since 1.77) - deprecated. Uses {@link#getServiceAsync} instead.
         *
         * Returns a service with the given name, creating it if necessary. Services are singleton objects identified
         * by their (resulting) name.
         *
         * Names without a dot are interpreted as service names within the default naming convention and will be
         * expanded to `"sap.ushell.services." + sServiceName`. Names containing a dot are not yet supported. This
         * name may be overridden via configuration. See example 2 below.
         *
         * The resulting name must point to a constructor function which is first required as a SAPUI5 module and
         * then called to create a service instance. The service will be passed to a corresponding service adapter
         * for the current logon system, as well as a callback interface (of virtual type `sap.ushell.services.ContainerInterface`)
         * to the container providing a method `createAdapter(oSystem)` to create further adapters for the same
         * service but connected to remote systems. The third parameter will be `sParameter` as passed to this function.
         * The fourth parameter will be an object with the property `config` supplied by the configuration. See
         * example 2 below.
         *
         * The adapter for the logon system will be created before the service. Its constructor gets three parameters.
         * The first parameter is the logon system, the second parameter is `sParameter` and the third parameter
         * is an object with the property `config` supplied by the configuration.
         *
         * The service may declare itself adapterless by setting the property `hasNoAdapter = true` at the constructor
         * function. In this case no adapter will be created and passed to the constructor and all other parameters
         * will be shifted.
         *
         * **Example 1:** The service `sap.ushell.services.UserInfo` is parameterless. It indicates this by setting
         * `sap.ushell.services.UserInfo.hasNoAdapter = true;`.
         *
         * **Example 2:** (Configuration)
         * ```javascript
         *
         *   window["sap-ushell-config"] = {
         *     services: {
         *       Foo: {
         *         module: "my.own.Foo"
         *         config: {header: "hidden"},
         *         adapter: {
         *           module: "my.own.FooAdapter",
         *           config: {foo: "bar"}
         *         }
         *       }
         *     }
         *   }
         *   oService = sap.ushell.Container.getService("Foo", "runtimeConfig");
         *   ```
         *  Now `oService` is an instance of `my.own.Foo`. The third parameter of the constructor will be "runtimeConfig",
         * the fourth parameter `{config: {header: "hidden"}}`. Its adapter is an instance of `my.own.FooAdapter`
         * constructed with the parameters logon system, "runtimeConfig" and `{config: {foo: "bar"}}`.
         *
         * Please note that the api will throw a runtime error (or reject for async mode) if the service name does
         * not reflect a service available.
         * See:
         * 	sap.ushell.services.ContainerInterface
         */
        getService(
          /**
           * The service name, such as "Menu"
           */
          sServiceName: string,
          /**
           * A parameter which is passed to the service constructor and every adapter constructor. (since 1.15.0)
           */
          sParameter?: string,
          /**
           * if true, the adapter is loaded asynchronously and a Promise is returned. (experimental, since 1.55.0)
           */
          bAsync?: boolean
        ): any;
        /**
         * @SINCE 1.55.0
         *
         * Returns a Promise that resolves a service with the given name, creating it if necessary. Services are
         * singleton objects identified by their (resulting) name.
         *
         * Names without a dot are interpreted as service names within the default naming convention and will be
         * expanded to `"sap.ushell.services." + sServiceName`. Names containing a dot are not yet supported. This
         * name may be overridden via configuration. See example 2 below.
         *
         * The resulting name must point to a constructor function which is first required as a SAPUI5 module and
         * then called to create a service instance. The service will be passed to a corresponding service adapter
         * for the current logon system, as well as a callback interface (of virtual type `sap.ushell.services.ContainerInterface`)
         * to the container providing a method `createAdapter(oSystem)` to create further adapters for the same
         * service but connected to remote systems. The third parameter will be `sParameter` as passed to this function.
         * The fourth parameter will be an object with the property `config` supplied by the configuration. See
         * example 2 below.
         *
         * The adapter for the logon system will be created before the service. Its constructor gets three parameters.
         * The first parameter is the logon system, the second parameter is `sParameter` and the third parameter
         * is an object with the property `config` supplied by the configuration.
         *
         * The service may declare itself adapterless by setting the property `hasNoAdapter = true` at the constructor
         * function. In this case no adapter will be created and passed to the constructor and all other parameters
         * will be shifted.
         *
         * **Example 1:** The service `sap.ushell.services.UserInfo` is parameterless. It indicates this by setting
         * `sap.ushell.services.UserInfo.hasNoAdapter = true;`.
         *
         * **Example 2:** (Configuration)
         * ```javascript
         *
         *   window["sap-ushell-config"] = {
         *     services: {
         *       Foo: {
         *         module: "my.own.Foo"
         *         config: {header: "hidden"},
         *         adapter: {
         *           module: "my.own.FooAdapter",
         *           config: {foo: "bar"}
         *         }
         *       }
         *     }
         *   }
         *   oService = sap.ushell.Container.getService("Foo", "runtimeConfig");
         *   ```
         *  Now `oService` is an instance of `my.own.Foo`. The third parameter of the constructor will be "runtimeConfig",
         * the fourth parameter `{config: {header: "hidden"}}`. Its adapter is an instance of `my.own.FooAdapter`
         * constructed with the parameters logon system, "runtimeConfig" and `{config: {foo: "bar"}}`.
         * See:
         * 	sap.ushell.services.ContainerInterface
         */
        getServiceAsync(
          /**
           * The service name, such as "Menu"
           */
          sServiceName: string,
          /**
           * A parameter which is passed to the service constructor and every adapter constructor.
           */
          sParameter?: string
        ): any;
        /**
         * @SINCE 1.31.0
         *
         * Register the work protection dirty callback function. In the work protect mechanism, each platform can
         * register their own method in order to check if data was changed during the session, and notify the container
         * about the change. Multiple registerings of the same function are allowed.
         *
         * Use `Function.prototype.bind()` to determine the callback's `this` or some of its arguments.
         */
        registerDirtyStateProvider(
          /**
           * Function for determining the state of the application. The callback is used to determine the current
           * dirty state during a navigation. The function must return a boolean which determines if the current application
           * is dirty or not. If `true` is returned the end user is prompted with a dialog where they need to confirm
           * the potential data loss. The callback is called with a navigation context as its first parameter which
           * can be used to determine the dirty state:
           * ```javascript
           *
           *  {
           *    status: "InProgress", // Enum which determines if a navigation currently takes place or if it is already finished. See sap.ushell.NavigationState.
           *    isCrossAppNavigation: true, // Boolean which indicates if the navigation is inner app our across two different applications.
           *    innerAppRoute: "&/SalesOrder/11" // If it is an inner app navigation, it describes the inner app route.
           *  }
           *  ```
           */
          fnDirty: Function
        ): void;
        /**
         * @SINCE 1.27.0
         *
         * Setter for the isDirty flag value.
         *
         * Default value is false
         */
        setDirtyFlag(
          /**
           * The value of the dirty flag.
           */
          bIsDirty?: boolean
        ): void;
        /**
         * @SINCE 1.21.2
         *
         * Determines the current logon frame provider for the entire Unified Shell. Initially, a rudimentary default
         * provider is active and should be replaced as soon as possible by the current renderer.
         *
         * A logon frame provider is used to facilitate user authentication even for requests sent via `XMLHttpRequest`.
         * It is called back in order to create a hidden `IFRAME`, to show it to the user, then to hide and destroy
         * it. The frame must be treated as a black box by the provider; especially with respect to the source of
         * the frame which is managed by the Unified Shell framework. Showing the frame might require user interaction
         * and some decoration around the frame. The frame should be destroyed, not reused, to be on the safe side.
         * Note that in typical cases with SAML2, authentication happens automatically and the frame can stay hidden.
         *
         * The following order of method calls is guaranteed:   The `create` method is called first.
         * The `show` method may be called next (if there is HTML code to display).  The `destroy` method is
         * called last.  A new cycle may start for a new logon process.
         * See:
         * 	sap.ushell.services.Container#cancelLogon
         */
        setLogonFrameProvider(
          /**
           * The new logon frame provider which needs to implement at least the methods documented here.
           */
          oLogonFrameProvider: {
            /**
             * A function taking no arguments and returning a DOM reference to an empty `IFRAME` which is initially
             * hidden. The frame must not be moved around in the DOM later on. Make sure to add all necessary parent
             * objects immediately, to render SAPUI5 controls as needed, and to return the DOM reference synchronously.
             */
            create: Function;
            /**
             * A function taking no arguments which hides and destroys the current frame.
             */
            destroy: Function;
            /**
             * A function taking no arguments which is called to indicate that the current frame probably needs to be
             * shown to the user because interaction is required. Note that there may be false positives here. It is
             * up to the provider how and when the frame is shown exactly; make sure to provide a good user interaction
             * design here.
             */
            show: Function;
          }
        ): void;
      }
      /**
       * @SINCE 1.15.0
       *
       * This is a virtual type for the callback interface passed by {@link sap.ui.Container.getService} to any
       * newly created service.
       */
      class ContainerInterface {
        /**
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor();
        /**
         * @SINCE 1.15.0
         *
         * For the given remote system, creates a new adapter that corresponds to the service to which this container
         * interface was passed at construction time.
         */
        createAdapter: undefined;
      }
      /**
       * @SINCE 1.15.0
       */
      class CrossApplicationNavigation {
        /**
         * The Unified Shell's CrossApplicationNavigation service, which allows to navigate to external targets
         * or create links to external targets
         *
         * This method MUST be called by the Unified Shell's container only, others MUST call `sap.ushell.Container.getService("CrossApplicationNavigation")`.
         * Constructs a new instance of the CrossApplicationNavigation service.
         *
         * CrossApplicationNavigation currently provides platform independent functionality.
         *
         * This interface is for usage by applications or shell renderers/containers.
         *
         * Usage:
         * ```javascript
         *
         *   sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then( function (oService) {
         *
         *      var sHref = oService.hrefForExternal({
         *          target : {
         *              semanticObject : "Product",
         *              action : "display" },
         *          params : {
         *              "ProductID" : "102343333"
         *          }
         *      }) || "";
         *
         *      // do something with sHref
         *   });
         *   ```
         *
         *
         * Parameter names and values are case sensitive.
         *
         * Note that the usage of multi-valued parameters (specifying an array with more than one member as parameter
         * value, e.g. ` params : { A : ["a1", "a2"] } ` ) is possible with this API but **strongly discouraged**.
         * Especially the navigation target matching performed at the back-end is not supported for multi-value
         * parameters. Furthermore, it is not guaranteed that additional parameter values specified in the back-end
         * configuration are merged with parameter values passed in this method.
         *
         * Note that the application parameter length (including SemanticObject/Action) shall not exceed 512 bytes
         * when serialized as UTF-8
         *
         * Note that when receiving the values as startup parameters (as part of the component data object) single
         * values are represented as an array of size 1. Above example is returned as ` deepEqual(getComponentData().startupParameters
         * , { "ProductID" : [ "102343333" ] } ) `
         *
         * Make sure not to store security critical data within an URL. URLs may appear in a server log, be persisted
         * inside and outside the system.
         *
         * Note: When constructing large URLs, the URLs may be shortened and persisted on a database server for
         * prolonged time, the actual data is persisted under a key accessible to any User (guessing the key).
         *
         * The same restrictions apply for the Application state.
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor();

        /**
         * Attempts to use the browser history to navigate to the previous app. A navigation to the Fiori Launchpad
         * Home is performed in case this method is called on a first navigation. In all other cases, this function
         * simply performs a browser back navigation.  Please note that the behavior of this method is subject
         * to change and therefore it may not yield to the expected results especially on mobile devices where "back"
         * is the previous inner app state iff these are put into the history!
         */
        backToPreviousApp(): void;
        /**
         * if sHashFragment is a compacted hash (sap-intent-param is present), in a hash, this function replaces
         * it into a long url with all parameters expanded
         */
        expandCompactHash(
          /**
           * an (internal format) shell hash
           */
          sHashFragment: string
        ): object;
        /**
         * @SINCE 1.38.0
         *
         * Returns a list of semantic objects of the intents the current user can navigate to.
         */
        getDistinctSemanticObjects(): any;
        /**
         * @SINCE 1.38.0
         *
         * Resolves the given semantic object (or action) and business parameters to a list of links available to
         * the user
         */
        getLinks(
          /**
           * An object containing nominal arguments for the method, having the following structure:
           * ```javascript
           *
           *   {
           *      semanticObject: "Object", // optional, matches any semantic objects if undefined
           *      action: "action",         // optional, matches any actions if undefined
           *      params: {                 // optional business parameters
           *         A: "B",
           *         C: ["e", "j"]
           *      },
           *      withAtLeastOneUsedParam: true, // optional, defaults to false.
           *                                     // If true, returns only the links that use at least one (non sap-) parameter from 'params'.
           *
           *      sortResultsBy: "intent", // optional parameter that decides on how the returned results will be sorted.
           *                               // Possible values are:
           *                               //   - "intent" (default) lexicographical sort on returned 'intent' field
           *                               //   - "text" lexicographical sort on returned 'text' field
           *                               //   - "priority" exprimental - top intents are returned first
           *
           *      treatTechHintAsFilter : true, // optional, defaults to false
           *                                    // if true, only apps that match
           *                                    // exactly the supplied technology
           *                                    // (e.g. sap-ui-tech-hint=WDA) will be considered
           *
           *      ui5Component: UI5Component, // mandatory, the UI5 component invoking the service, shall be a root component!
           *
           *      appStateKey: "abc123...",   // optional, application state key to add to the generated links, SAP internal usage only
           *
           *      compactIntents: true        // optional, whether intents should be returned in compact format.
           *                                  // Defaults to false.
           *
           *      ignoreFormFactor: true,     // optional, defaults to false, deprecated, do not use, may have no effect in the future
           *
           *      tags: ["tag-1", "tag-2"]    // optional, if specified, only returns links that match inbound with certain tags.
           *   }
           *   ```
           *
           *
           * Starting from UI5 version 1.52.0 the `params` argument can be specified in the extended format:
           *
           *
           * ```javascript
           *
           *   ...
           *   params: {
           *      P1: { value: "v1" },
           *      P2: { value: ["v2", "v3"] }
           *   }
           *   ```
           *
           *
           * When the parameter is expressed in this format, the caller can specify additional search options.
           *
           * Besides 'value', supported search options for the extended format are:
           * 	 **required**: whether the parameter must be required (true) or not required (false) in the signature
           * of the matching target (once the navigation occurs to the returned link). Please note that this option
           * will be effective if the Fiori Launchpad is configured to resolve navigation targets via `sap.ushell.services.ClientSideTargetResolution`
           * and therefore may not be supported in all platforms.
           *
           * Example:
           * ```javascript
           *
           *         ...
           *         params: {
           *           P1: { value: "v1", required: true },
           *           P2: { value: ["v2", "v3"] }
           *         }
           *         ...
           *       ```
           *
           *
           * This method supports a mass invocation interface to obtain multiple results with a single call, as
           * shown in the following example:
           *
           *
           * ```javascript
           *
           *     oCrossApplicationService.getLinks([ // array, because multiple invocations are to be made
           *        [                           // arguments for the first invocation
           *          { semanticObject: "SO" }  // this method supports one parameter only in each call
           *        ],
           *        [                           // arguments for the second invocation
           *          { action: "someAction" }
           *        ]
           *        // ... and so on
           *     ]);
           *   ```
           *
           *
           * Calling this method with no arguments will produce the same result as if the method was called with
           * an empty object.
           */
          vArgs?: object | object[]
        ): any;
        /**
         * @SINCE 1.48
         *
         * For a given semantic object, this method considers all actions associated with the semantic object and
         * returns the one tagged as a "primaryAction". If no inbound tagged as "primaryAction" exists, then the
         * intent of the first inbound (after sorting has been applied) matching the action "displayFactSheet".
         *
         * The primary intent is determined by querying {@link CrossApplicationNavigation#getLinks} with the given
         * semantic object and optional parameter. Then the resulting list is filtered to the outcome that a single
         * item remains.
         */
        getPrimaryIntent(
          /**
           * Semantic object.
           */
          sSemanticObject: string,
          /**
           * @see CrossApplicationNavigation#getSemanticObjectLinks for description.
           */
          mParameters?: object
        ): any;
        /**
         * @SINCE 1.19.0
         * @deprecated (since 1.38.0) - use getLinks
         *
         * Resolves a given semantic object and business parameters to a list of links, taking into account the
         * form factor of the current device.
         */
        getSemanticObjectLinks(
          /**
           * the semantic object such as `"AnObject"`
           */
          sSemanticObject: string,
          /**
           * the map of business parameters with values, for instance
           * ```javascript
           *
           *   {
           *     A: "B",
           *     c: "e"
           *   }
           *   ```
           */
          mParameters?: object,
          /**
           * when set to `true` the form factor of the current device is ignored
           */
          bIgnoreFormFactor?: boolean,
          /**
           * SAP UI5 Component invoking the service
           */
          oComponent?: Object,
          /**
           * application state key to add to the generated links, SAP internal usage only
           */
          sAppStateKey?: string,
          /**
           * whether the returned intents should be returned in compact format. Defaults to false.
           */
          bCompactIntents?: boolean
        ): object;
        /**
         * performs window.history.go() with number of steps if provided and if supported by the underlying platform.
         * May be a noop if the url is the first url in the browser. If no argument is provided it wil call window.history.go(-1)
         */
        historyBack(
          /**
           * positive integer representing the steps to go back in the history
           */
          iSteps: number
        ): void;
        /**
         * @SINCE 1.15.0
         *
         * Returns a string which can be put into the DOM (e.g. in a link tag) given an application specific hash
         * suffix
         *
         * Example: `hrefForAppSpecificHash("View1/details/0/")` returns `#SemanticObject-action&/View1/details/0/`
         * if the current application runs in the shell and was started using "SemanticObject-action" as shell navigation
         * hash
         */
        hrefForAppSpecificHash(
          /**
           * the app specific router, obtained e.g. via router.getURL(...). Note that sAppHash shall not exceed 512
           * bytes when serialized as UTF-8.
           */
          sAppHash: string
        ): string;
        /**
         * @SINCE 1.15.0
         *
         * Returns a string which can be put into the DOM (e.g. in a link tag)
         */
        hrefForExternal(
          /**
           * object encoding a semantic object and action, e.g.
           * ```javascript
           *
           *   {
           *     target : { semanticObject : "AnObject", action: "action" },
           *     params : { A : "B" }
           *   }
           *   ```
           *  or e.g.
           * ```javascript
           *
           *   {
           *     target : {
           *       semanticObject : "AnObject",
           *       action: "action", context  : "AB7F3C"
           *     },
           *     params : {
           *       A : "B",
           *       c : "e"
           *     }
           *   }
           *   ```
           *  or
           * ```javascript
           * { target : { shellHash : "SO-36?jumper=postman" } }```
           */
          oArgs: object,
          /**
           * the root component of the application
           */
          oComponent: object,
          /**
           * if set to `true`, a promise will be returned instead of the direct argument. The promise will only succeed
           * after all compaction requests have been sent
           */
          bAsync: boolean
        ): string;
        /**
         * @SINCE 1.36.0
         *
         * Checks whether the FLP has performed the first navigation. This method can be used to detect whether
         * the current app was started directly, that is, without a previous navigation to another app, to the FLP
         * home, or another target that adds an entry in the browser history.
         */
        isInitialNavigation(): boolean;
        /**
         * @SINCE 1.19.1
         * @deprecated - switch to isNavigationSupported. Note that this has a slightly different response format
         *
         * Tells whether the given intent(s) are supported, taking into account the form factor of the current device.
         * "Supported" means that navigation to the intent is possible. Note that the intents are assumed to be
         * in internal format and expanded.
         */
        isIntentSupported(
          /**
           * the intents (such as `["#AnObject-action?A=B&c=e"]`) to be checked
           */
          aIntents: string[],
          /**
           * the root component of the application
           */
          oComponent?: object
        ): object;
        /**
         * @SINCE 1.32
         *
         * Tells whether the given navigation intent(s) are supported for the given parameters, form factor etc.
         * "Supported" means that a valid navigation target is configured for the user for the given device.
         *
         * This is effectively a test function for {@link toExternal}/ {@link hrefForExternal}. It is functionally
         * equivalent to {@link isIntentSupported} but accepts the same interface as {@link toExternal}/ {@link
         * hrefForExternal}.
         */
        isNavigationSupported(
          /**
           * the intents to be checked with object being instances the oArgs object of toExternal, hrefForExternal
           * etc. e.g. ` { target: { semanticObject: "AnObject", action: "action" }, params: { A: "B" } } ` or e.g.
           * ` { target: { semanticObject: "AnObject", action: "action" }, params: { A: "B", c: "e" } } ` or `{ target:
           * { shellHash: "SO-36&jumper=postman" } }`
           */
          aIntents: object[],
          /**
           * the root component of the application
           */
          oComponent?: object
        ): object;
        /**
         * @SINCE 1.15.0
         *
         * Navigate to an specified external target (e.g. different launchpad application). Invocation will trigger
         * an hash change and subsequent invocation of the application.
         *
         * If the navigation target opens in a new window the running application may be retained.
         */
        toExternal(
          /**
           * configuration object describing the target, e.g. ` { target : { semanticObject : "AnObject", action:
           * "action" }, params : { A : "B" } } ` constructs sth. like `#AnObject-action?A=B&C=e&C=j`; or e.g. ` {
           * target : { semanticObject : "AnObject", action: "action", context : "AB7F3C" }, params : { A : "B", c
           * : "e" } } ` or `{ target : { shellHash : "SO-36&jumper=postman" } }` and navigate to it via changing
           * the hash
           *
           * A proper way for an application to generate a link to return to the home page of the Fiori launchpad
           * is: `hrefForExternal( { target : { shellHash : "#" }})`
           *
           * Do *not* use "#Shell-home" or "Shell-home" to navigate to a specific homepage!
           *
           * The actual navigation may occur deferred!
           *
           * Since version 1.56 this API accepts a sap-xapp-state-data parameter that can be used to launch and application
           * with certain data, for example:
           * ```javascript
           *
           *   {
           *     target : { semanticObject : "AnObject", action: "action" },
           *     params : { "sap-xapp-state-data" : JSON.stringify({ a: "b", c: "d" }) }
           *   }
           *   ```
           *
           *
           * The data specified via "sap-xapp-state-data" are passed to the target application in the sap-xapp-state
           * parameter.
           *
           * Note that the sap-xapp-state-data parameter itself is not passed to the target application.
           *
           * Note that the application parameter length (including SemanticObject/Action) shall not exceed 512 bytes
           * when serialized as UTF-8
           */
          oArgs: Object,
          /**
           * an optional SAP UI5 Component,
           */
          oComponent?: object
        ): void;
        /**
         * @SINCE 1.15.0
         *
         * Returns a string which can be put into the DOM (e.g. in a link tag)
         */
        hrefForExternal(
          /**
           * object encoding a semantic object and action, e.g.
           * ```javascript
           *
           *   {
           *     target : { semanticObject : "AnObject", action: "action" },
           *     params : { A : "B" }
           *   }
           *   ```
           *  or e.g.
           * ```javascript
           *
           *   {
           *     target : {
           *       semanticObject : "AnObject",
           *       action: "action", context  : "AB7F3C"
           *     },
           *     params : {
           *       A : "B",
           *       c : "e"
           *     }
           *   }
           *   ```
           *  or
           * ```javascript
           * { target : { shellHash : "SO-36?jumper=postman" } }```
           */
          oArgs: object,
          /**
           * if set to `true`, a promise will be returned instead of the direct argument. The promise will only succeed
           * after all compaction requests have been sent
           */
          bAsync: boolean
        ): string;
      }
      /**
       * @SINCE 1.25.1
       *
       * The Unified Shell's end user feedback service
       */
      class EndUserFeedback {
        /**
         * This method MUST be called by the Unified Shell's container only, others MUST call `sap.ushell.Container.getService("EndUserFeedback")`.
         * Constructs a new instance of the end user feedback service.
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor(
          /**
           * the service adapter for the end user feedback service, as already provided by the container
           */
          oAdapter: object,
          /**
           * the interface provided by the container
           */
          oContainerInterface: object,
          /**
           * the runtime configuration specified in the `sap.ushell.Container.getService()` call (not evaluated yet)
           */
          sParameters: string,
          /**
 * the service configuration defined in the bootstrap configuration; the boolean property `enabled` controls
 * the service enablement
 * 
 * This service is enabled by default. It can be disabled explicitly in the bootstrap configuration of the
 * start page: 
 * ```javascript
 * 
  window["sap-ushell-config"] = {
    services: {
      EndUserFeedback: {
        config: { enabled: true }
      }
    }
  }
  ```
 * 
 * 
 * Platform implementations can also enable it dynamically by modification of the bootstrap configuration
 * during boot time.
 */
          oServiceConfiguration: object
        );

        /**
         * @SINCE 1.25.1
         */
        getLegalText(): String;
        /**
         * @SINCE 1.25.1
         *
         * Checks if the service is enabled. The service enablement depends on the configuration in the back-end
         * system and the bootstrap configuration.
         */
        isEnabled(): Object;
        /**
         * @SINCE 1.25.1
         *
         * Sends a feedback. Forwards the given data (JSON object) to the associated adapter.
         */
        sendFeedback(
          /**
           * object containing the input fields required for the end user feedback.
           */
          JSON: JSON
        ): void;
      }
      /**
       * @SINCE 1.15.0
       *
       * A service for handling groups, tiles and catalogs.
       *
       * The functions that return the main objects are getGroups, getGroupTitle, getCatalogs and getCatalogTiles.
       * Since the implementation (i.e. adapter) is platform specific, do not call or access properties and functions
       * of returned objects. Instead, use other functions of the LaunchPage service with the relevant object
       * as the input parameter.
       *
       * When using the content extension factory, any extended content needs to refer to the correct adapter
       * with the field "contentProvider".
       */
      class LaunchPage {
        /**
         * This method MUST be called by the Unified Shell's container only, others MUST call `sap.ushell.Container.getService("LaunchPage")`.
         * Constructs a new instance of the page builder service.
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor(
          /**
           * the page builder adapter for the logon system
           */
          oAdapter: object,
          /**
           * the interface provided by the container
           */
          oContainerInterface: object
        );

        /**
         * Adds a new group.
         *
         * In case of success, the `done` function gets the new added group object. Intention: the page builder
         * adds this group to the end of the home screen.
         *
         * In case of failure, the `fail` function returns the consistent (i.e. persisted) backend state of all
         * groups.
         */
        addGroup(
          /**
           * The title of the new group
           */
          sTitle: string
        ): object;
        /**
         * Adds a new group at a specific location.
         *
         * In case of success, the `done` function gets the new added group object. Intention: the page builder
         * adds this group to the specific location on the home screen.
         *
         * In case of failure, the `fail` function returns the consistent (i.e. persisted) backend state of all
         * groups.
         */
        addGroupAt(
          /**
           * The title of the new group
           */
          sTitle: string,
          /**
           * the location of the new group
           */
          iIndex: number
        ): object;
        /**
         * Adds a tile to a group.
         *
         * If no group is provided then the tile is added to the default group.
         *
         * In case of success, the `done` function returns the new tile. Intention: the page builder by default
         * puts this tile at the end of the default group. In case of failure, the `fail` function should return
         * the consistent (i.e. persisted) backend state of the default group.
         */
        addTile(
          /**
           * An 'anonymous' tile from the tile catalog
           */
          oCatalogTile: object,
          /**
           * The target group
           */
          oGroup?: object
        ): object;
        /**
         * Returns the press handler for clicking on a tile.
         */
        getAppBoxPressHandler(
          /**
           * The tile
           */
          oTile: object
        ): Function;
        /**
         * @SINCE 1.21.2
         *
         * Returns catalog's technical data.
         */
        getCatalogData(
          /**
           * the catalog
           */
          oCatalog: object
        ): object;
        /**
         * @SINCE 1.17.1
         *
         * Returns the catalog's technical error message in case it could not be loaded from the backend.  **Beware:**
         * The technical error message is not translated!
         */
        getCatalogError(
          /**
           * the catalog
           */
          oCatalog: object
        ): string;
        /**
         * Returns the catalog's unique identifier
         */
        getCatalogId(
          /**
           * The catalog
           */
          oCatalog: object
        ): string;
        /**
         * Returns the catalogs of the user.  Only severe failures make the overall operation fail. If loading
         * of a remote catalog fails, this is handled gracefully by providing a "dummy" empty catalog (with ID instead
         * of title). Use {@link getCatalogError} to check if a (remote) catalog could not be loaded from the backend.
         *  Progress notifications are sent for each single catalog, i.e. attaching a `progress` handler gives
         * you the same possibilities as attaching a `done` handler, but with the advantage of improved responsiveness.
         */
        getCatalogs(): object;
        /**
         * Returns catalog tile's unique identifier. This function may be called for a catalog tile or (since 1.21.0)
         * for a group tile. In the latter case, the function returns the unique identifier of the catalog tile
         * on which the group tile is based.
         */
        getCatalogTileId(
          /**
           * The tile or the catalog tile
           */
          oTile: object
        ): string;
        /**
         * Returns the keywords associated with a catalog tile which can be used to find the catalog tile in a search.
         * Note: getCatalogTileView **must** be called **before** this method. Otherwise the keywords may be incomplete.
         */
        getCatalogTileKeywords(
          /**
           * The catalog tile
           */
          oCatalogTile: object
        ): string[];
        /**
         * @SINCE 1.16.3
         *
         * Returns preview icon for a catalog tile.
         */
        getCatalogTilePreviewIcon(
          /**
           * The catalog tile
           */
          oCatalogTile: object
        ): string;
        /**
         * @SINCE 1.40
         *
         * Returns preview subtitle for a catalog tile.
         */
        getCatalogTilePreviewSubtitle(
          /**
           * The catalog tile
           */
          oCatalogTile: object
        ): string;
        /**
         * @SINCE 1.16.3
         *
         * Returns preview title for a catalog tile.
         */
        getCatalogTilePreviewTitle(
          /**
           * The catalog tile
           */
          oCatalogTile: object
        ): string;
        /**
         * Returns the tiles of a catalog. In case of success, the `done` function of the returned promise object
         * gets an array of 'anonymous' tiles of the catalog.
         */
        getCatalogTiles(
          /**
           * The catalog
           */
          oCatalog: object
        ): object;
        /**
         * Returns the size of a catalog tile as a string. For example: "1x1", "1x2"
         */
        getCatalogTileSize(
          /**
           * The catalog tile
           */
          oCatalogTile: object
        ): string;
        /**
         * Returns the tags associated with a catalog tile which can be used to find the catalog tile in a tag filter.
         */
        getCatalogTileTags(
          /**
           * The catalog tile
           */
          oCatalogTile: object
        ): string[];
        /**
         * Returns the navigation target URL of a catalog tile. If the catalog tile does not exist, this function
         * implicitly instantiates it using {@link #getCatalogTileView(oCatalogTile)}.
         */
        getCatalogTileTargetURL(
          /**
           * The catalog tile
           */
          oCatalogTile: object
        ): string;
        /**
         * @SINCE 1.67.0
         *
         * Returns the catalog tile info
         */
        getCatalogTileTitle(
          /**
           * The catalog tile
           */
          oCatalogTile: object
        ): string;
        /**
         * @deprecated (since 1.48) - (as a result of XMLHttpRequest spec prohibiting the sending of synchronous
         * requests). Use `getCatalogTileViewControl` instead
         *
         * Returns the UI5 view or control of a catalog tile
         */
        getCatalogTileView(
          /**
           * The catalog tile
           */
          oCatalogTile: object
        ): object;
        /**
         * Returns the UI5 view or control of a catalog tile
         */
        getCatalogTileViewControl(
          /**
           * The catalog tile
           */
          oCatalogTile: object
        ): object;
        /**
         * Returns the catalog's title
         */
        getCatalogTitle(
          /**
           * The catalog
           */
          oCatalog: object
        ): string;
        /**
         * Returns the default group of the user. In case of success, the `done` function gets an 'anonymous' object
         * representing the default group.
         */
        getDefaultGroup(): object;
        /**
         * Returns the unique identifier of the given group
         */
        getGroupId(
          /**
           * The group whose id is returned
           */
          oGroup: object
        ): string;
        /**
         * Returns the groups of the user. In case of success, the `done` function gets an array of 'anonymous'
         * groups. The order of the array is the order in which the groups will be displayed to the user.
         */
        getGroups(): any;
        /**
         * Returns an array of 'anonymous' tiles of a group. The order of the array is the order of tiles that will
         * be displayed to the user.
         */
        getGroupTiles(
          /**
           * The group whose tiles are returned
           */
          oGroup: object
        ): any;
        /**
         * Returns the title of the given group.
         */
        getGroupTitle(
          /**
           * The group whose title is returned
           */
          oGroup: object
        ): string;
        /**
         * Returns an array of link tiles for a group. The order of the array is the order in which the links will
         * be displayed to the user.
         */
        getLinkTiles(
          /**
           * The group whose link tiles are returned
           */
          oGroup: object
        ): any;
        /**
         * Returns the tile's unique identifier
         */
        getTileId(
          /**
           * The tile
           */
          oTile: object
        ): string;
        /**
         * Returns the tile size in the format of 1x1 or 1x2 string
         */
        getTileSize(
          /**
           * The tile
           */
          oTile: object
        ): string;
        /**
         * Returns the tile's navigation target.
         *
         * The navigation target string is used (when assigned to `location.hash`) for performing a navigation action
         * that eventually opens the application represented by the tile.
         */
        getTileTarget(
          /**
           * the tile
           */
          oTile: object
        ): string;
        /**
         * Returns the tile's title.
         */
        getTileTitle(
          /**
           * The tile
           */
          oTile: object
        ): string;
        /**
         * Returns the tile's type.
         */
        getTileType(
          /**
           * The tile
           */
          oTile: object
        ): string;
        /**
         * Returns UI5 view or control of the tile. In case of success the `done` function should return UI5 view
         * or control of the tile. In case of failure the `fail` function should return nothing.
         */
        getTileView(
          /**
           * The tile
           */
          oTile: object
        ): object;
        /**
         * @SINCE 1.16.4
         *
         * Returns whether the catalogs collection previously returned by `getCatalogs()` is still valid.
         *
         * Initially the result is `false` until `getCatalogs()` has been called. Later, the result might be `false`
         * again in case one of the catalogs has been invalidated, e.g. due to adding a tile to a catalog ("Add
         * to catalog" scenario).
         * See:
         * 	#getCatalogs
         */
        isCatalogsValid(): boolean;
        /**
         * Checks if a group was marked as featured (meaning the group is a Fiori 3 featured group).
         *
         * Returns `true` if the group is featured and `false` if not.
         */
        isGroupFeatured(
          /**
           * The group to be checked
           */
          oGroup: object
        ): boolean;
        /**
         * Checks if a group was marked as locked (meaning the group and its tiles will lack several capabilities
         * such as Rename, Drag&Drop...).
         *
         * Returns `true` if the group is locked and `false` if not.
         */
        isGroupLocked(
          /**
           * The group to be checked
           */
          oGroup: object
        ): boolean;
        /**
         * Checks if a group can be removed.
         *
         * Returns `true` if the group can be removed (i.e. if the given group was created by the user) and `false`
         * if the group can only be reset.
         */
        isGroupRemovable(
          /**
           * The group to be checked
           */
          oGroup: object
        ): boolean;
        /**
         * Moves a group to a new index (i.e. location).
         *
         * In case of success, the `done` function is called without any value. Intention: the page builder already
         * moved the page (visible to the user) and if successful - nothing needs to be done. In case of failure,
         * the `fail` function returns the consistent (i.e. persisted) backend state of all groups.
         */
        moveGroup(
          /**
           * The group to be moved
           */
          oGroup: object,
          /**
           * The new index for the group
           */
          iNewIndex: number
        ): object;
        /**
         * Moves a tile within a group or between different groups.
         *
         * In case of success, the `done` function returns nothing. Intention: the page builder already moved the
         * tile.
         *
         * In case of failure, the `fail` function returns the consistent (i.e. persisted) backend state of the
         * source group and the target group. The result is in the following format {source:[{},{}], target:[{},{}]}.
         *
         * The source and the target groups tiles are in the form of the @see sap.ushell.services.LaunchPage.getGroupTiles
         */
        moveTile(
          /**
           * a tile instance to be moved. The same object type as the one returned by `sap.ushell.services.LaunchPage.getGroupTiles`
           */
          oTile: object,
          /**
           * the index in the source group
           */
          iSourceIndex: number,
          /**
           * the target group index, in case this parameter is not supplied we assume the move tile is within the
           * source group using iSourceIndex
           */
          iTargetIndex: number,
          /**
           * the source group the tile came from
           */
          oSourceGroup: object,
          /**
           * The same object type as the one returned by `sap.ushell.services.LaunchPage.getGroups` the target group
           * the tile will be placed in, in case this parameter is not supplied we assume the move tile is within
           * the source group
           */
          oTargetGroup?: object,
          /**
           * (added with 1.46) The new type of the tile
           */
          sNewTileType?: string
        ): object;
        /**
         * Triggers a refresh action of a tile. Typically this action is related to the value presented in dynamic
         * tiles
         */
        refreshTile(
          /**
           * The tile
           */
          oTile: object
        ): void;
        /**
         * Register an external tile actions provider callback function.
         *
         * The callback has to return an array of actions of the given tile. The callback is triggered when @see
         * sap.ushell.services.LaunchPage.getTileActions is called.
         *
         * Tile actions are additional operations that can be executed on a tile, and can be provided by external
         * providers.
         *
         * A tile action is an object with the following properties: text, icon and targetURL or a press handler.
         *
         * Tile actions should be returned immediately without any additional server access in order to avoid delays
         * in rendering the action list in the browser.
         */
        registerTileActionsProvider(
          /**
           * A callback which returns an array of action objects.
           */
          fnProvider: Object
        ): void;
        /**
         * Removes a group.
         *
         * In case of success, the `done` function is called without any value (i.e. input data). Intention: the
         * page builder already removed the page (or hid it from the user) and if successful - nothing needs to
         * be done.
         *
         * In case of failure, the `fail` function returns the consistent (i.e. persisted) backend state of all
         * groups.
         */
        removeGroup(
          /**
           * The group to be removed
           */
          oGroup: object,
          /**
           * The index of the group to be removed
           */
          iIndex: number
        ): object;
        /**
         * Removes a tile from a group.
         *
         * In case of success, the `done` function returns the new tile. Intention: the page builder has already
         * 'hidden' (or removed) the tile.
         *
         * In case of failure, the `fail` function should return the consistent (i.e. persisted) backend state of
         * the group.
         */
        removeTile(
          /**
           * The group from which to remove the tile instance
           */
          oGroup: object,
          /**
           * The tile instance to remove
           */
          oTile: object,
          /**
           * The tile index
           */
          iIndex: number
        ): object;
        /**
         * Resets a group.
         *
         * The reset action is relevant for a group that was assigned to the user by an administrator. The reset
         * action means that the group is set back to the state defined by the administrator, and changes made by
         * the end user (e.g. adding tiles) are removed. A group can be reset multiple times.
         *
         * In case of success, the `done` function gets the reset group object.
         *
         * In case of failure, or when the given group was created by the user (i.e. can't be reset)- `fail` handler
         * is called, returning the consistent (i.e. persisted) backend state of all groups. The returned group
         * object is the same as the one returned by @see sap.ushell.services.LaunchPage.getGroups
         */
        resetGroup(
          /**
           * The group to be reset
           */
          oGroup: object,
          /**
           * The index of the group to be reset
           */
          iIndex: number
        ): object;
        /**
         * Sets the title of an existing group.
         *
         * In case of success, the `done` function returns nothing. Intention: the page builder knows the new title,
         * and if successful nothing needs to be done, as the title is already visible to the user. In case of failure,
         * the `fail` function returns the consistent (i.e. persisted) backend state of the group title, in most
         * cases the old title.
         */
        setGroupTitle(
          /**
           * The group whose title is set
           */
          oGroup: object,
          /**
           * The new title of the group
           */
          sTitle: string
        ): object;
        /**
         * Sets the tile's visibility state and notifies the tile about the change.
         */
        setTileVisible(
          /**
           * The tile
           */
          oTile: object,
          /**
           * The tile's required visibility state.
           */
          bNewVisible: boolean
        ): void;
      }
      /**
       * @SINCE 1.16.0
       */
      class Message {
        /**
         * This method MUST be called by the Unified Shell's container only, others MUST call `sap.ushell.Container.getServiceAsync("Message")`.
         * Constructs a new instance of the page builder service.
         *
         * Message service.
         * See:
         * 	sap.ushell.services.Container#getServiceAsync
         */
        constructor();

        /**
         * @SINCE 1.16.0
         *
         * Shows an confirmation dialog on the screen.
         *
         * The callback is called with the following signature: `function(oAction)` where oAction is the button
         * that the user has tapped. For example, when the user has pressed the close button, a sap.m.MessageBox.Action.Close
         * is returned.
         *
         * If no actions are provided, OK and Cancel will be shown. In this case oAction is set by one of the following
         * three values: 1. sap.m.MessageBox.Action.OK: OK (confirmed) button is tapped. 2. sap.m.MessageBox.Action.Cancel:
         * Cancel (unconfirmed) button is tapped. 3. null: Confirm dialog is closed by Calling sap.m.InstanceManager.closeAllDialogs()
         */
        confirm(
          /**
           * the localized message as plain text
           */
          sMessage: string,
          /**
           * callback function
           */
          fnCallback: Function,
          /**
           * the localized title as plain text
           */
          sTitle?: string,
          /**
           * Either a single action, or an array of two actions. If no action(s) are given, the single action MessageBox.Action.OK
           * is taken as a default for the parameter. If more than two actions are given, only the first two actions
           * are taken. Custom action string(s) can be provided, and then the translation of custom action string(s)
           * needs to be done by the application.
           */
          vActions?:
            | sap.m.MessageBox.Action
            | sap.m.MessageBox.Action[]
            | string
            | string[]
        ): void;
        /**
         * @SINCE 1.16.0
         *
         * Shows an error message on the screen.
         */
        error(
          /**
           * the localized message as plain text
           */
          sMessage: string,
          /**
           * the localized title as plain text
           */
          sTitle?: string
        ): void;
        /**
         * @SINCE 1.81.0
         *
         * Shows an error message with details on the screen. If more than one control should be shown, an {sap.m.VBox}
         * can be used. The default title is "error". If no custom buttons are given, an emphasized "close" button
         * is shown.
         */
        errorWithDetails(
          /**
           * The localized message as plain text
           */
          message: string,
          /**
           * The control that should be displayed, once a user presses the "View Details" link
           */
          detailControl?: sap.ui.core.Control,
          /**
           * The localized title as plain text
           */
          title?: string,
          /**
           * The custom buttons that should be shown on the dialog
           */
          buttons?: sap.m.Button[]
        ): sap.m.Dialog;
        /**
         * @SINCE 1.16.0
         *
         * Shows a MessageToast on the screen.
         */
        info(
          /**
           * the localized message as plain text
           */
          sMessage: string,
          /**
           * display duration in ms
           */
          iDuration?: number
        ): void;
      }
      /**
       * @SINCE 1.15.0
       *
       * The Unified Shell's internal navigation target resolution service
       *
       * Methods in this class deal with *internal* representations of the shell hash.
       *
       * configurations: `config : { allowTestUrlComponentConfig : true }` allow to redefine the Test-url, Test-local1,
       * Test-local2 applications via url parameters (sap-ushell-test-local1-url= / sap-ushell-test-local1-additionalInformation=
       * ... )
       */
      class NavTargetResolution {
        /**
         * This method MUST be called by the Unified Shell's container only, others MUST call `sap.ushell.Container.getService("NavTargetResolution")`.
         * Constructs a new instance of the navigation target resolution service.
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor(
          /**
           * a Service configuration
           */
          oServiceConfiguration: object
        );

        /**
         * expands a URL hash fragment
         *
         * This function gets the hash part of the URL and expands a sap-intent-param if present and retrievable
         *
         * This is an asynchronous operation.
         */
        expandCompactHash(
          /**
           * The formatted URL hash fragment in internal format (as obtained by the SAPUI5 hasher service, not as
           * given in `location.hash`)
           */
          sHashFragment: string
        ): string;
        /**
         * @SINCE 1.32
         *
         * Tells whether the given navigation intent(s) are supported for the given parameters Supported" means
         * that a valid navigation target is configured for the user for the given device form factor.
         *
         * This is effectively a test function for {@link toExternal}/ {@link hrefForExternal}. It is functionally
         * equivalent to {@link isIntentSupported} but accepts the same input as {@link toExternal}/ {@link hrefForExternal}.
         */
        isNavigationSupported(
          /**
           * the intents (such as `["#AnObject-action?A=B&c=e"]`) to be checked with object beeing instances the oArgs
           * object of toExternal, hrefForExternal etc. e.g. ` { target : { semanticObject : "AnObject", action: "action"
           * }, params : { A : "B" } } ` or e.g. ` { target : { semanticObject : "AnObject", action: "action" }, params
           * : { A : "B", c : "e" } } ` or `{ target : { shellHash : "AnObject-action?A=B&c=e" } }`
           */
          aIntents: object[]
        ): object;
        /**
 * Resolves the URL hash fragment.
 * 
 * This function should be used by a custom renderer in order to implement custom navigation. Do not use
 * this function for developing Fiori applications.
 * 
 * This function gets the hash part of the URL and returns data of the target application.
 * 
 * Example of the returned data: 
 * ```javascript
 * 
  {
    "additionalInformation": "SAPUI5.Component=sap.ushell.renderers.fiori2.search.container",
    "applicationType": "URL",
    "url": "/sap/bc/ui5_ui5/ui2/ushell/resources/sap/ushell/renderers/fiori2/search/container",
    "navigationMode": "embedded"
  }
  ```
 * 
 * 
 * This is an asynchronous operation.
 */
        resolveHashFragment(
          /**
           * The formatted URL hash fragment in internal format (as obtained by the SAPUI5 hasher service) not as
           * given in `location.hash`)! Example: `#SemanticObject-action?P1=V1&P2=A%20B%20C`
           */
          sHashFragment: string
        ): object;
        /**
         * Resolves a navigation target taking into account the sap-system
         *
         * This function should be used by the NWBC browser in order to get a resolved target corresponding to a
         * certain configuration object describing the target. Do not use this function for developing Fiori applications.
         */
        resolveTarget(
          /**
           * ` { target : { semanticObject : "semantic object", action : "action", }, params : { "sap-system-src":
           * "e.g. sid(UR5.120)", "sap-system": { ... data related to the sap-system } } } `
           */
          oArgs: object
        ): any;
      }
      /**
       * @SINCE 1.32.0
       */
      class Notifications {
        /**
         * UShell service for fetching user notification data from the Notification center/service
         *  and exposing them to the Unified Shell and Fiori applications UI controls.
         *
         * In order to get user notifications, Unified Shell notification service issues OData requests
         *  to the service defined by the configuration property `serviceUrl`,
         *  for example: "/sap/opu/odata4/iwngw/notification/default/iwngw/notification_srv/0001"
         * .
         *
         * Unified Shell Notification service has several working modes, depending on the environment and the available
         * resources:
         *  PackagedApp mode: Fiori launchpad runs in the context of PackagedApp
         *  FioriClient mode: Fiori launchpad runs in the context of FioriLaunchpad
         *  WebSocket mode: Fiori launchpad runs in a browser, and WebSocket connection to the notifications provider
         * is available
         *  Polling mode: Fiori launchpad in runs in a browser, and WebSocket connection to the notifications provider
         * is not available
         *
         *
         * The notification service exposes an API that includes: - Service enabling and initialization
         *  - Registration of callback functions (by Shell/FLP controls) that will be called for every data update
         * . - Retrieval of notification data (e.g. notifications, number of unseen notifications) - Execution of
         * a notification actions - Marking user notifications as seen
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor(
          /**
           * The interface provided by the container
           */
          oContainerInterface: object,
          /**
           * Not used in this service
           */
          sParameters: object,
          /**
           * configuration
           */
          oServiceConfiguration: object
        );

        /**
         * @SINCE 1.34
         *
         * Launches dismiss notification call.
         */
        dismissNotification(
          /**
           * The ID of the notification whose action is being executed
           */
          sNotificationId: object
        ): any;
        /**
         * @SINCE 1.32
         *
         * Launches a notification action oData call.
         *  After launching the action, the function gets updated notification data in order to push the updated
         * data to the consumers.
         */
        executeBulkAction(
          /**
           * The ID of the notification header/group whose action is being executed
           */
          sNotificationGroupId: object,
          /**
           * The ID of the action that is being executed
           */
          sActionId: object
        ): any;
        /**
         * @SINCE 1.38
         *
         * Returns the notifications of the user sorted by type include the group headers and the notifications
         */
        getNotificationsByTypeWithGroupHeaders(): any;
        /**
         * @SINCE 1.44
         *
         * Returns the number of notifications
         *  e.g. Notifications for user.
         */
        getNotificationsCount(): number;
        /**
         * @SINCE 1.44
         *
         * Returns the group headers of the user notifications
         */
        getNotificationsGroupHeaders(): any;
        /**
         * @SINCE 1.32
         *
         * Returns the number of unseen notifications
         *  e.g. Notifications that the user hasn't seen yet.
         */
        getUnseenNotificationsCount(): any;
        /**
         * @SINCE 1.32
         *
         * Initializes the notification service
         *
         * Initialization is performed only if the following two conditions are fulfilled:
         *  1. Notification service is enabled
         *  2. Notification service hasn't been initialized yet
         *
         *
         * The main initialization functionality is determining and setting the mode in which notifications are
         * consumed.
         *  The possible modes are:
         *  PACKAGED_APP - Notifications are fetched when a callback is called by PackagedApp environment
         *  FIORI_CLIENT - Notifications are fetched when a callback is called by FioriClient environment
         *  WEB_SOCKET - Notifications are fetched on WebSocket "ping"
         *  POLLING - Notifications are fetched using periodic polling mechanism
         */
        init(): void;
        /**
         * @SINCE 1.32.0
         *
         * Indicates whether notification service is enabled.
         *  Enabling is based on the `enable` service configuration flag.
         *  The service configuration must also include serviceUrl attribute.
         */
        isEnabled(): boolean;
        /**
         * @SINCE 1.38
         */
        isFirstDataLoaded(): boolean;
        /**
         * @SINCE 1.34
         *
         * Launches mark as read notification call.
         *  After launching the action, the function gets updated notification data in order to push the updated
         * data to the consumers.
         */
        markRead(
          /**
           * The ID of the notification whose action is being executed
           */
          sNotificationId: object
        ): any;
        /**
         * @SINCE 1.32
         *
         * Mark all notifications as seen.
         *  the main use-case is when the user navigated to the notification center and sees all the pending notifications.
         */
        notificationsSeen(): void;
        /**
         * @SINCE 1.32
         *
         * Gets a callback function that will be called when updated unseen notifications count is available.
         */
        registerNotificationCountUpdateCallback(
          /**
           * The callback function that is registered and called on data update.
           */
          callback: object
        ): void;
        /**
         * @SINCE 1.32
         *
         * Gets a callback function that will be called when updated notifications data is available.
         */
        registerNotificationsUpdateCallback(
          /**
           * The callback function that is registered and called on data update.
           */
          callback: object
        ): void;
      }
      /**
       * @SINCE 1.15.0
       *
       * The Unified Shell's personalization service, which provides a personalizer object that handles all personalization
       * operations.
       */
      class Personalization {
        /**
         * This method MUST be called by the Unified Shell's container only, others MUST call `sap.ushell.Container.getService("Personalization")`.
         * Constructs a new instance of the personalization service.
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor(
          /**
           * the service adapter for the personalization service, as already provided by the container
           */
          oAdapter: object
        );

        /**
         * @SINCE 1.22.0
         *
         * Factory method to obtain an empty Data Context object. When data present in a prior context is not relevant
         * (e.g. when using a "uniquely" generated key and planning to overwrite any colliding front-end server
         * data).
         *
         * The call always returns an cleared container().
         *
         * Note that an existing container at the front-end server is not actually deleted or overwritten unless
         * a save operation is executed.
         *
         * An initial object is returned.
         */
        createEmptyContainer(
          /**
           * identifies the container. The string length is restricted to 40 characters
           */
          sContainerKey: string,
          /**
           * scope object. Currently the validity property of the scope object is relevant: E.g. ` { validity : 30}`
           * indicates a validity of the data for 30 minutes.
           *  oScope.validity : validity of the container persistence in minutes valid values include: 0 ( per FLP
           * Window), Infinity, undefined ( Backend persistence per user ) [Default] nn Minutes ( Backend persistence
           * per user, ignored if older than nn minutes)
           */
          oScope: Object,
          /**
           * Since 1.27.0. SAPUI5 component which uses the container. This allows to associate the stored data with
           * the application.
           */
          oComponent: sap.ui.core.Component
        ): object;
        /**
         * @SINCE 1.22.0
         *
         * Asynchronously starts a deletion request for the given container identified by sContainerKey. Can be
         * called without having ever called getContainer with the corresponding key
         *
         * Note: After invoking this operation, the state of other Containers obtained for the same key is undefined!
         * If you want to use the container after deletion, it is strongly recommended to obtain a new instance
         * of a container for the given key *after* the promise has returned.
         *
         * Note: Invoking this operation while another save or load operation is under way may result in failure.
         */
        delContainer(
          /**
           * identifies the container
           */
          sContainerKey: string
        ): object;
        /**
         * @SINCE 1.18.0
         * @deprecated
         */
        delPersonalizationContainer(
          /**
           * identifies the container
           */
          sContainerKey: string
        ): object;
        /**
         * @SINCE 1.22.0
         *
         * Factory method to obtain a Data Context object, which is a local copy of the persistence layer data.
         * The Container data is asynchronously read on creation if present, otherwise an initial object is created.
         * The Container data can then be *synchronously* modified (getItemValue, setItemValue). Only on invoking
         * the save()/saveDeferred() method the data is transferred to the persistence. This allows the application
         * to perform multiple local modifications and delay the save operation.
         *
         * Every getContainer operation returns a new local copy, containing the full data at the point of creation.
         *
         * Executing load() on the container reloads the data from the persistence, discarding local changes.
         *
         * Note that the container allows the application to control the round trips to the front-end server persistence.
         * The factory method getContainer is asynchronous and loads the container via the connected adapter from
         * the front-end server. All operations (but for the save operation) are executed synchronously, operating
         * on the local data. This allows the application to control the round trips to the front-end server persistence.
         *
         * A container can contain a set of items, identified by a key.
         *
         * You can wrap a container in a VariantSetAdapter to read and write a more complex structure (with multiple
         * keys (variantSet,variant,item)).
         *
         * Do not mix up the usage of a personalizer and a container for one containerKey. Do not use a PersonalizationContainer
         * and a Container for the same key except for migration scenarios.
         *
         * scope / validity parameter (@since 1.22.0): An unspecified (undefined validity) or infinite (Infinity)
         * validity indicates that data is persisted in the Personalization data of the front-end server. A round
         * trip is executed on an initial get and at least every save operation. Data is stored per user and retained
         * indefinitely at the front-end server.
         *
         * The validity parameter allows a designated storage validity for the created container. A 0 validity indicates
         * the data is only persisted within the Fiori Launchpad window. No round trips to the front-end server
         * are executed. Data is lost if the Fiori Launchpad window state is lost (e.g. by navigating to a different
         * page, pressing F5 (reload page) or duplicating the window).
         *
         * For versions > 1.24 it may happen that for cross-app navigation a reload of the Fiori Launchpad is triggered.
         * In this case a storage of the personalization data in the Fiori lauchpad window would lead to data loss.
         * To overcome this a validity 0 is automatically changed to a validity 1440 (24h; storage on the front-end
         * server). This is only done if a reload of the Fiori Launchpad is triggered for a cross-app navigation.
         *
         * Security: It is the responsibility of the application to not persist information relevant to auditing
         * or security using the PersonalizationService with inappropriate validity models. No mechanisms exist
         * to destroy or selectively destroy application-specific data in the front-end server persistence (especially
         * for validity Infinity).
         *
         * For non-zero validity scopes, data will be transmitted and persisted in the front-end server system.
         *
         * For limited validity, actual deletion of data on the front-end server is subject to explicit cleanup
         * execution of front-end server jobs and not guaranteed. The data may still be persisted and retrievable.
         * The interface only assures that expired data is no longer exposed to the application code in the Fiori
         * Launchpad.
         *
         * The ContainerKey uniquely defines the Container, validity is not part of the key (there are no separate
         * namespaces per validity).
         *
         * In general, mixing different validity models for a given container key is not supported. Fast chaining
         * of different methods may source arbitrary persistence layers. The validity of the resulting object in
         * the done function of a promise is the last get validity.
         *
         * The validity associated with the last getContainer or createEmptyContainer determines the current validity
         * of the container and the validity used during the next save operation.
         *
         * Naturally, if a delete or get with validity 0 is issued, it will *not* delete or retrieve a front-end
         * server persistent storage. Thus a sequence delete( [validity 0])/wait for promise, getContainer(sKey,{
         * validity : Infinity}) may return a valid dataset.
         */
        getContainer(
          /**
           * identifies the container. The string length is restricted to 40 characters
           */
          sContainerKey: string,
          /**
           * scope object. Currently the validity property of the scope object is relevant: E.g. ` { validity : 30}`
           * indicates a validity of the data for 30 minutes.
           *  oScope.validity : validity of the container persistence in minutes
           *  valid values include: 0 ( per FLP Window),
           *  Infinity, undefined (front-end server persistence per user ) [Default]
           *  nn Minutes (front-end server persistence per user, ignored if older than nn minutes) oScope.shared To
           * indicate that this container is intended to be shared by several applications
           */
          oScope: Object,
          /**
           * Since 1.27.0. SAPUI5 component which uses the container. This allows to associate the stored data with
           * the application.
           */
          oComponent: sap.ui.core.Component
        ): object;
        /**
         * @SINCE 1.28.0
         *
         * Returns a generated key This key is suitably random depending on the platform, but it is viable to brute
         * force attacks and storages based on it shall not be used for sensitive data
         */
        getGeneratedKey(): string;
        /**
         * @SINCE 1.18.0
         * @deprecated - use getContainer()
         *
         * This interface is deprecated since 1.22, please use getContainer / delContainer.
         *
         * Note: the underlying storage model for Objects stored with getContainer / getPersonalizationContainer
         * is identical.
         *  Thus you can safely migrate your client implementation from the deprecated getContainer to getPersonalizationContainer
         * without loss of data. One may even run mixed set of applications on the same container keys. The sole
         * differences are w.r.t. client side handling of the Context data within one session.
         *
         * If you want to use the variant interface, use the following pattern ` getContainer(sContainerKey).done(function(oContainer)
         * { var variantSetAdapter = new Personalization.VariantSetAdapter(oContainer); } `
         *
         * Factory method to obtain a personalization container object which is a client-local buffer for personalization
         * data. The Container data is asynchronously read on creation (if present, otherwise an initial object
         * is created). The Container data can then be *synchronously* modified (read/write/delete). Only on invoking
         * the save() method the data is persisted at the front-end server. This allows the application to perform
         * multiple local modifications and delay the save operation. Note that the personalization container allows
         * the application to control the round trips to the front-end server persistence. The factory method getPersonalizationContainer
         * is asynchronous and loads the container via the connected adapter from the front-end server. All operations
         * (but for the save operation) are executed synchronously, operating on the local data. This allows the
         * application to control the round trips to the front-end server persistence.
         *
         * A personalization container can contain items as well as variant sets. Variant sets have the following
         * structure: variantSet.variant.item A variant set is enclosing several variants of the same data.
         *
         * Example: An application has two types of variants. Variant type 1 contains filter values for a query,
         * which are stored in item 1 of the variant, and personalization data for a table, which are stored in
         * item 2 of the variant. Variant type 2 contains a setting (item 3) that is independent of the filtering
         * and the table settings. It might be used for a different screen than the variants of type 1. In this
         * example you would have 2 variant sets, one for each variant type.
         *
         * Do not mix up the usage of a personalizer and a personalization container for one containerKey.
         */
        getPersonalizationContainer(
          /**
           * identifies the container
           */
          sContainerKey: string
        ): object;
        /**
         * @SINCE 1.15.0
         *
         * Returns a personalizer object which handles personalization by asynchronous operations storing the personalization
         * data immediately via the connected adapter. For each operation a round trip is executed.
         *
         * Do not mix the usage of a personalizer and a personalization container for one containerKey.
         */
        getPersonalizer(
          /**
           * JSON object consisting of the following parts: container - Identifies the set of personalization data
           * that is loaded/saved as one bundle from the front-end server. item - The name of the object the personalization
           * is applied to.
           */
          oPersId: object,
          /**
           * scope object
           *  currently the validity property of the scope object is relevant: oScope.validity : validity of the container
           * persistence in minutes
           *  oScope.keyCategory : Type or category of key
           *  oScope.writeFrequency : Expected frequency how often users will use this container to store data inside
           *  oScope.clientStorageAllowed : Defines if storage on client side should be allowed or not
           *  oScope.shared: Indicates the container is intended to be shared across multiple applications
           *  E.g. ` { validity : 30}` indicates a validity of the data for 30 minutes.
           */
          oScope: object,
          /**
           * Since 1.27.0. SAPUI5 component which uses the personalizer. This allows to associate the stored data
           * with the application.
           */
          oComponent: sap.ui.core.Component
        ): object;
        /**
         * @SINCE 1.18.0
         *
         * Returns a transient personalizer object which handles personalization by asynchronous operations storing
         * the personalization data transiently as an object property. Primary usage of the transient personalizer
         * is a personalization scenario with variants where the transient personalizer is used as a buffer for
         * table personalization data.
         */
        getTransientPersonalizer(): object;
      }
      /**
       * @SINCE 1.18.0
       *
       * The personalization container is the anchor object of the unified shell personalization in container
       * mode.
       */
      class PersonalizationContainer {
        /**
         * To be called by the personalization service getPersonalizationContainer method.
         */
        constructor();

        /**
         * @SINCE 1.18.0
         *
         * Creates a new variant set in the container. In case a variant set with this key is already existing an
         * exception is thrown.
         */
        addVariantSet(
          /**
           * variant set key
           */
          sVariantSetKey: string
        ): object;
        /**
         * @SINCE 1.18.0
         *
         * Checks if a specific direct item is contained in the container.
         */
        containsItem(
          /**
           * item key
           */
          sItemKey: string
        ): boolean;
        /**
         * @SINCE 1.18.0
         *
         * Checks if a specific variant set is contained in the container.
         */
        containsVariantSet(
          /**
           * variant set key
           */
          sVariantSetKey: string
        ): boolean;
        /**
         * @SINCE 1.18.0
         *
         * Deletes a direct item from the container. In case the item does not exist, nothing happens.
         */
        delItem(
          /**
           * item key
           */
          sItemKey: string
        ): void;
        /**
         * @SINCE 1.18.0
         *
         * Deletes a variant set from the container. In case the variant set does not exist nothing happens.
         */
        delVariantSet(
          /**
           * variant set key
           */
          sVariantSetKey: string
        ): void;
        /**
         * @SINCE 1.18.0
         *
         * Returns an array with the keys of direct items in the container.
         */
        getItemKeys(): any[];
        /**
         * @SINCE 1.18.0
         *
         * Returns the value for a direct item from the container.
         */
        getItemValue(
          /**
           * item key
           */
          sItemKey: string
        ): object;
        /**
         * @SINCE 1.18.0
         *
         * Returns an array with the keys of the variant sets in the container.
         */
        getVariantSetKeys(): any[];
        /**
         * @SINCE 1.18.0
         *
         * (Re)loads the current container data from the underlying storage asynchronously. The current local data
         * is discarded.
         *
         * Returns a promise for the load operation. If another save/load/delete operation is not completed, the
         * operation may fail! (wait for the other promise).
         *
         * Synchronous read and write operations before the load is done have undefined effects.
         */
        load(): object;
        /**
         * @SINCE 1.18.0
         *
         * Attempts to save the current container data at the underlying storage asynchronously. The current state
         * is serialized.
         */
        save(): object;
        /**
         * @SINCE 1.18.0
         *
         * Sets the value of a direct item in the container. In case the item is already existing its value is overwritten.
         * In case it is not existing a new item with this key and value is created.
         */
        setItemValue(
          /**
           * item key
           */
          sItemKey: string,
          /**
           * item value (JSON object)
           */
          oItemValue: object
        ): void;
      }
      /**
       * @SINCE 1.18.0
       *
       * The personalization variant contains personalization data. It is used in the personalization container
       * mode.
       */
      class PersonalizationContainerVariant {
        /**
         * To be called by the personalization variant set.
         */
        constructor();

        /**
         * @SINCE 1.18.0
         *
         * Checks if a specific item is contained in this variant.
         */
        containsItem(
          /**
           * item key
           */
          sItemKey: string
        ): boolean;
        /**
         * @SINCE 1.18.0
         *
         * Deletes an item from this variant. In case the item does not exist, nothing happens.
         */
        delItem(
          /**
           * item key
           */
          sItemKey: string
        ): void;
        /**
         * @SINCE 1.18.0
         *
         * Returns an array with the keys of all items in this variant.
         */
        getItemKeys(): any[];
        /**
         * @SINCE 1.18.0
         *
         * Returns the value for an item in this variant.
         */
        getItemValue(
          /**
           * item key
           */
          sItemKey: string
        ): object;
        /**
         * @SINCE 1.18.0
         *
         * Returns the key of this variant.
         */
        getVariantKey(): string;
        /**
         * @SINCE 1.18.0
         *
         * Returns the name of this variant.
         */
        getVariantName(): string;
        /**
         * @SINCE 1.18.0
         *
         * Sets the value for an item in this variant.
         */
        setItemValue(
          /**
           * item key
           */
          sItemKey: string,
          /**
           * value (JSON object)
           */
          item: object
        ): void;
      }
      /**
       * @SINCE 1.18.0
       *
       * The personalization variant set contains variants of personalization data. It is used in the personalization
       * container mode.
       */
      class PersonalizationContainerVariantSet {
        /**
         * To be called by the personalization container.
         */
        constructor();
        /**
         * @SINCE 1.18.0
         *
         * Deletes a variant from the variant set. In case the variant does not exist nothing happens.
         */
        delVariant: undefined;

        /**
         * @SINCE 1.18.0
         *
         * Checks if a specific variant is contained in the variant set.
         */
        containsVariant(
          /**
           * variant key
           */
          sVariantKey: string
        ): boolean;
        /**
         * @SINCE 1.18.0
         *
         * Returns the current variant key.
         */
        getCurrentVariantKey(): string;
        /**
         * @SINCE 1.18.0
         *
         * Returns a variant object.
         */
        getVariant(
          /**
           * variant key
           */
          sVariantKey: string
        ): object;
        /**
         * @SINCE 1.18.0
         *
         * Returns the variant key corresponding to a variant name.
         */
        getVariantKeyByName(
          /**
           * variant name
           */
          sVariantName: string
        ): object;
        /**
         * @SINCE 1.18.0
         *
         * Returns an array with the keys of the variants in the variant set.
         */
        getVariantKeys(): any[];
        /**
         * @SINCE 1.18.0
         *
         * Sets the current variant key.
         */
        setCurrentVariantKey(
          /**
           * There is no validity check for the variant key.
           */
          sVariantKey: string
        ): void;
      }
      /**
       * @SINCE 1.15.0
       */
      class ShellNavigation {
        /**
 * The Unified Shell's internal navigation service (platform independent) This method MUST be called by
 * the Unified Shell's container only, others MUST call `sap.ushell.Container.getService("ShellNavigation")`.
 * Constructs a new instance of the shell navigation service.
 * 
 * Note that the shell instantiation mechanism has to assure exactly one instance is created (!)
 * 
 * This interface is for consumption by shell renderers/containers only
 * 
 * It is not for direct usage by applications, see inner app navigation : UI5 interfaces (hashChanger, Router)
 * cross app navigation : @see CrossApplicationNavigation
 * 
 * Usage:
 * 
 * Example: see renders/fiorisandbox/Shell.controller.js
 * 
 * 
 * ```javascript
 * 
  sap.ui.define([
     "sap/ushell/services/ShellNavigation"
  ], function (ShellNavigation) {
      Shell.onHashChange(shellHash,appHash) {  / *resolve url, load app and exchange root view* / }
      Shell.init() {
        this.privShellNavigator = new ShellNavigation();
        this.privShellNavigator.init(jQuery.proxy(this.doHashChange, this));
      }
  });
  ```
 * 
 * 
 * Note: further app specific integration via the reference app reuse code (setting of app specific handler)
 * 
 * Note: the ShellNavigation service replaces the UI5 core HashChanger which abstracts from the browser
 * url modification.
 * 
 * It performs the following services: - encoding of the actual browser url hash ( via hasher.js). - expansion
 * of "shortened" urls ( AppParameterParts) via invocation. - splitting of shellHash and AppSpecific hash
 * and abstraction w.r.t. Eventing
 * 
 * Thus it is crucial to use appropriate interfaces and not directly invoke window.location.hash.
 * 
 * - internal construction methods for a "current" App specific and non-app specific hash (invoked by CrossApplicationNavigation),
 * 			not to be invoked directly!
 * See:
 * 	sap.ushell.services.Container#getService
 */
        constructor(
          /**
           * interface
           */
          oContainerInterface: object,
          /**
           * parameters
           */
          sParameters: string,
          /**
           * configuration
           */
          oServiceConfiguration: object
        );

        /**
         * Initializes ShellNavigation
         *
         * This function should be used by a custom renderer in order to implement custom navigation. Do not use
         * this function for developing Fiori applications.
         *
         * This method should be invoked by the Shell in order to: - Register the event listener - Register the
         * container callback for the (currently single) ShellHash changes.
         *
         * Signature of the callback function sShellHashPart, // The hash part on the URL that is resolved and used
         * for application loading sAppSpecificPart // Typically ignored sOldShellHashPart, // The old shell hash
         * part, if exist sOldAppSpecificPart, // The old app hash part, if exist
         */
        init(
          /**
           * The callback method for hash changes
           */
          fnShellCallback: Function
        ): object;
      }
      /**
       * @SINCE 1.44.0
       */
      class SmartNavigation {
        /**
         * Constructs an instance of SmartNavigation.
         *
         *  The constructed service provides an enhancement on {@link CrossApplicationNavigation#getLinks} and
         * {@link CrossApplicationNavigation#toExternal}. In order for an application to leverage this enhancement,
         * it is pertinent that the application uses {@link SmartNavigation#toExternal} for naviagtion. Hence the
         * caller can subsequently use {@link SmartNavigation#getLinks} with the outcome that it sorts the resulting
         * list in the order of frequency of Attempted navigation from the application to respective links.
         *  Attempted in the previous paragraph is emphasized due to the fact that a click on the link
         * will cause an increment of the frequency count, regardless of wether the navigation was successful or
         * not.  Note that an instance of this service should be obtained with `sap.ushell.services.Container#getService(
         * "SmartNavigation" )`
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor();

        /**
         * @SINCE 1.44.0
         *
         * Resolves the given semantic object (or action) and business parameters to a list of links available to
         * the user, sorted according their relevance to the calling application.
         *
         * The relevance of link is defined by the frequency with which a navigation activity from the calling application
         * to that link occurs.
         *
         * Internally, this method delegates to {@link sap.ushell.services.CrossApplicationNavigation#getLinks}
         * and then sorts the resulting list accordingly.
         * See:
         * 	sap.ushell.services.CrossApplicationNavigation#getLinks
         */
        getLinks(): any;
        /**
         * @SINCE 1.48.0
         *
         * Completely delegates to {@link sap.ushell.services.CrossApplicationNavigation#getPrimaryIntent}, and
         * either may be used in place of the other with exactly the same outcome.
         * See:
         * 	sap.ushell.services.CrossApplicationNavigation#getPrimaryIntent
         */
        getPrimaryIntent(): void;
        /**
         * @SINCE 1.46.0
         *
         * Completely delegates to {@link sap.ushell.services.CrossApplicationNavigation#hrefFoExternal}, and either
         * may be used in place of the other with exactly the same outcome.
         * See:
         * 	sap.ushell.services.CrossApplicationNavigation#hrefForExternal
         */
        hrefForExternal(): void;
        /**
         * @SINCE 1.44.0
         *
         * Usage of this method in place of {@link sap.ushell.services.CrossApplicationNavigation#toExternal} drives
         * the smartness of the results returned by {@link sap.ushell.services.SmartNavigation#getLinks}.
         * See:
         * 	sap.ushell.services.CrossApplicationNavigation#toExternal
         */
        toExternal(): void;
        /**
         * @SINCE 1.46.0
         *
         * Tracks a navigation to a valid intent if provided via arguments but does not perform the navigation itself.
         * If no valid intent was provided tracking will be prevented. The intent has to consist of SemanticObject
         * and Action. It may be passed as complete shellHash (presidence) or as individual parts Additional parameters
         * will not be part of the tracking and ignored This Method can be used to track a click if the actual navigation
         * was triggered via clicking a link on the UI.
         */
        trackNavigation(
          /**
           * The navigation target as object, for example: `{ target: { shellHash: 'SaleOrder-display' } }` or ` {
           * target: { semanticObject: 'SalesOrder', action: 'action' } } `
           */
          oArguments: object
        ): object;
      }
      /**
       * @SINCE 1.19.1
       *
       * The Unified Shell's Support Ticket service
       */
      class SupportTicket {
        /**
         * This method MUST be called by the Unified Shell's container only, others MUST call `sap.ushell.Container.getService("SupportTicket")`.
         * Constructs a new instance of the support ticket service.
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor(
          /**
           * the service adapter for the support ticket service, as already provided by the container
           */
          oAdapter: object,
          /**
           * the interface provided by the container
           */
          oContainerInterface: object,
          /**
           * the runtime configuration specified in the `sap.ushell.Container.getService()` call (not evaluated yet)
           */
          sParameters: string,
          /**
 * the service configuration defined in the bootstrap configuration; the boolean property `enabled` controls
 * the service enablement
 * 
 * This service is disabled by default. It can be enabled explicitly in the bootstrap configuration of the
 * start page: 
window["sap-ushell-config"] = {
    services: {
        SupportTicket: {
 *            config: {
                enabled: true
            }
        }
    }
}

Platform implementations
 * can also enable it dynamically by modification of the
bootstrap configuration during boot time.
 */
          oServiceConfiguration: object
        );

        /**
         * @SINCE 1.20.0
         *
         * Creates a Support Ticket. Forwards the given data (JSON object) to the associated adapter.
         */
        createTicket(
          /**
           * JSON object containing the input fields required for the support ticket.
           */
          oSupportTicketData: JSON
        ): object;
        /**
         * @SINCE 1.20.0
         *
         * Checks if the service is enabled.  The service enablement depends on the configuration in the back-end
         * system and the bootstrap configuration.
         */
        isEnabled(): boolean;
      }
      /**
       * @SINCE 1.18.0
       *
       * The transient personalizer shall be used in container mode for table personalization.
       */
      class TransientPersonalizer {
        /**
         * To be called by the personalization service getTransientPersonalizer method.
         */
        constructor();

        /**
         * @SINCE 1.18.0
         *
         * Deletes a personalization data value.
         */
        delPersData(): object;
        /**
         * @SINCE 1.18.0
         *
         * Gets a personalization data value.
         */
        getPersData(): object;
        /**
         * @SINCE 1.18.0
         *
         * Synchronously gets a personalization data value.
         */
        getValue(): object;
        /**
         * @SINCE 1.18.0
         *
         * Sets a personalization data value.
         */
        setPersData(
          /**
           * JSON object containing the personalization value.
           */
          oValue: object
        ): object;
        /**
         * @SINCE 1.18.0
         *
         * Synchronously sets a personalization data value.
         */
        setValue(
          /**
           * JSON object containing the personalization value.
           */
          oValue: object
        ): void;
      }
      /**
       * @SINCE 1.15.0
       */
      class URLParsing {
        /**
         * The Unified Shell's internal URL parsing service (platform independent) This method MUST be called by
         * the Unified Shell's container only, others MUST call `sap.ushell.Container.getService("URLParsing")`.
         * Constructs a new instance of the URL parsing service.
         *
         * Methods in this class allow to break down a shell compliant hash into it's respective parts (SemanticObject,Action,Context,
         * Parameters, appSpecificHash) or (ShellPart,appSpecificHash) respectively or construct a hash from its
         * constituents.
         *
         * All methods deal with the *internal* shellHash format.
         *
         * Most of the parse methods are robust w.r.t. a leading "#".
         *
         * Note: The functions were designed with a "truthy" behaviour for not present values, Thus a client should
         * not rely on the difference between null, "undefined", "" when testing for the result of a parse action.
         *
         * The parsing functions are deliberately restrictive and fragile, only shell compliant hashes are parsed
         * correctly, behaviour for non-compliant hashes is undefined and subject to change, notably we do not aim
         * do "degrade" nicefully or support partial parsing of corrupted urls.
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor();

        /**
         * @SINCE 1.19.1
         * @deprecated - please use `sap.ui.model.odata.ODataUtils.setOrigin(sServiceUrl, { alias : sSystem });`
         * The system alias can be extracted from the Component via `getComponentData().startupParameters["sap-system"][0]`
         *
         * Note: deprecated, please use `sap.ui.model.odata.ODataUtils.setOrigin(sServiceUrl, { alias : sSystem
         * });` Makes the given server-relative SAP OData service URL point to the system given explicitly as parameter
         * `vComponentOrSystem`. If this parameter is not provided, it makes the server-relative URL point to the
         * system of the current application. ***Server-relative URL*** means a URL starting with exactly one "/"
         * (also known as absolute-path URL). The ***system of the current application*** is taken from the parameter
         * "sap-system" of the last navigation target resolution result.  If either a multiple-origin
         * parameter `;mo/` or an origin parameter with qualified system (`;o=sid(SYS.123)` or `o=SYSALIAS`) is
         * already present, the `sServiceUrl` is returned unchanged.  The framework invokes this function for
         * SAPUI5 applications that have been built using declarative model instantiation with the application descriptor
         * (data source) mechanism or using an sap.ca framework. For these applications, you do not need to invoke
         * this function explicitly in the application code. If the application does not use any of these mechanisms,
         * but explicitly constructs additional OData models or performs OData requests, the application code shall
         * invoke this function. It shall pass its root component instance as `vComponentOrSystem` - the function
         * will then determine the system from the navigation start-up parameter "sap-system" (`getComponentData().startupParameters["sap-system"][0]).
         * Applications may call this API with parameter vComponentOrSystem` and a non-empty string value
         * if application-specific logic is used to determine the target system for service calls.  With service
         * URLs converted using this API, administrators can redirect service calls to servers other than the default
         * SAP Gateway and back-end server either via reverse proxy (e.g. SAP Web Dispatcher) configuration or using
         * the system alias functionality of the SAP Gateway server.  The system is added to the last URL segment
         * of the service URL with the segment parameter `;o=`. You can also make this function put the system to
         * a different URL path segment of the service URL by specifying the empty segment parameter `;o=`, e.g.
         * `/sap/opu/odata/MyService;o=/MyEntities/$count?p1=v1`. If both `vComponentOrSystem` is empty and the
         * current application has no system, no system is added and the empty segment parameter `;o` is removed.
         *
         *
         * **Example 1:** `/sap/opu/odata/MyService/?p1=v1` is converted to `/sap/opu/odata/MyService;o=SYS/?p1=v1`
         * if the target system is "SYS". However it remains unchanged if both the current application's
         * system ***and*** the parameter `vComponentOrSystem` are empty.
         *
         *
         * **Example 2:** `/sap/opu/odata/MyService;o=/MyEntities/$count?p1=v1` is converted to `/sap/opu/odata/MyService;o=sid(SYS.123)/MyEntities/$count?p1=v1`
         * if parameter `vComponentOrSystem` is set to "sid(SYS.123)".  The URL is in no way
         * normalized.
         */
        addSystemToServiceUrl(
          /**
           * a server-relative URL without system alias information
           */
          sServiceUrl: string,
          /**
           * the root component of the FLP application ( `getComponentData().startupParameters["sap-system"][0]`
           * is used as system alias if present) or a string valued system specification like "SYS" or "sid(SYS.123)"
           * if undefined or falsy the system of the current application is used
           */
          vComponentOrSystem?: string | sap.ui.core.Component
        ): string;
        /**
         * @SINCE 1.16.0
         *
         * compose a shell Hash from it's respective parts Note that it also may append an app specific route !
         */
        constructShellHash(
          /**
           * The action must be a valid action, it may not contain "?" or directly a parameter string `undefined`
           * if not a parseable hash ` { target: { semanticObject: string, action: string, contextRaw: string }, params:
           * MapObject, appStateKey: string appSpecificRoute: string } ` xor `{ target: { shellHash
           * } }` Note: in general it is preferred to add an appStateKey directly to the params object
           */
          oShellHash: object
        ): string;
        /**
         * @SINCE 1.16.0
         *
         * Extract a hash part from an URL, including an app-specific part
         */
        getHash(
          /**
           * any value
           */
          sURL: String
        ): String;
        /**
 * @SINCE 1.16.0
 * 
 * Extract the Shell hash# part from an URL The application specific route part is removed
 * See:
 * 	getHash for a function which retains the app specific route

Shell services shall use this service to
 * extract relevant parts of an URL from an actual URL string
(which should be treated as opaque)

The
 * URL has to comply with the Fiori-Wave 2 agreed upon format

This service shall be used to extract
 * a hash part from an url.
The result can be further broken up by parseShellHash

Examples
http://a.b.c?defhij#SemanticObject-Action~Context?PV1=A&PV2=B&/appspecific
 * 
returns : "#SemanticObject-Action~Context?PV1=A&PV2=B&/appspecific"

Note: the results when passing
 * an illegal (non-compliant) url are undefined and subject to change w.o. notice.
Notably further checks
 * may added.
The design is deliberately restrictive and non-robust.
 */
        getShellHash(
          /**
           * a valid (Shell) url, e.g.
           *  `http://xx.b.c#Object-name~AFE2==?PV1=PV2&PV4=V5&/display/detail/7?UU=HH`
           */
          sShellHashString: string
        ): Object;
        /**
         * @SINCE 1.30.0
         *
         * Check if a URL has an intent based navigation part which can be parsed into a semantic object and action
         * part. Accepts only a relative URL (must contain #) or fully qualified Urls for which origin and filename
         * must correspond to the running launchpad.
         *
         * Given actual url `http://www.mycorp.com/sap/fiori/FioriLaunchpad.html?sap-language=DE#SO-action?P1=value1`,
         * the following parts http://www.mycorp.com/sap/fiori/FioriLaunchpad.html must match.
         *
         * The actual test is synchronous and *only* tests whether the hash part can be parsed and contains a semantic
         * object and action. It does not test whether the intent or it's parameters is valid for a given user
         */
        isIntentUrl(
          /**
           * the URL to test. Note: this url must be in internal format.
           */
          sUrl: String
        ): Boolean;
        /**
         * @SINCE 1.20.0
         *
         * combine members of a javascript object into a parameter string, note that parameters are ordered in an
         * arbitrary manner which is subject to change
         */
        paramsToString(
          /**
           * any value { ABC : [1,"1 2"], DEF : ["4"]}
           */
          oParams: Object
        ): String;
        /**
         * @SINCE 1.20.0
         *
         * parse parameters from a URI query string (starting with ?) into a parameter object
         */
        parseParameters(
          /**
           * Parameter string, e.g. `?ABC=1&ABC=1%202DEF=4`
           */
          sParams: String
        ): Object;
        /**
         * @SINCE 1.16.0
         *
         * Decompose a shell hash into the respective parts
         */
        parseShellHash(
          /**
           * Hash part of a shell compliant URL `#SO-Action~Context?P1=a&P2=x&/route?RPV=1` the hash part of an URL,
           *
           *  e.g. `"#Object-name~AFE2==?PV1=PV2&PV4=V5&/display/detail/7?UU=HH`
           */
          sHash: String
        ): object;
        /**
         * @SINCE 1.16.0
         *
         * split a Unified Shell compliant hash into an Object containing a shell specific part and an app specific
         * parts
         *  for non compliant hash strings, the empty object {} is returned. an optional leading # is stripped
         */
        splitHash(
          /**
           * Hash part of a shell conformant URL #SO-Action~Context?P1=a&P2=x&/route?RPV=1 the hash part
           * of an URL, e.g. "#Object-name~AFE2==?PV1=PV2&PV4=V5&/display/detail/7?UU=HH
           */
          sHash: String
        ): object;
      }
      /**
       * @SINCE 1.32.0
       *
       * A UShell service for tracking business flows and user actions.
       */
      class UsageAnalytics {
        /**
         * The UsageAnalytics service exposes API for logging custom events and setting custom field values in the
         * logged events.
         *  The data is sent via http and recorded on a server, whose URL is defined by the `baseUrl` service configuration
         * property.
         *  The service configuration must also include the site ID from the `pubToken` attribute.
         *  You can find the pubToken in the code snippet provided in the WARP when creating a new site.
         *
         * Each tracked event is represented by a table entry on the server database.
         *  The administrator can produce reports based on the the recorded data.
         *
         * Two types of events can be logged:
         *  - Automatic events: Click or pageLoad are predefined events, logged by the base tracking library.
         *  You can disable these events in the service configuration.
         *  - Custom events: You can use the service API to log an event with custom data using the function logCustomEvent
         *
         *
         * Each tracked event (either automatic or custom) is represented by a database row, that includes 10 custom
         * attributes named custom1...custom10.
         *  Some of these values can be set using UsageAnalytics service API.
         *
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor(
          /**
           * The interface provided by the container
           */
          oContainerInterface: object,
          /**
           * Not used in this service
           */
          sParameter: object,
          /**
           * Service configuration
           */
          oServiceProperties: object
        );

        /**
         * @SINCE 1.32.0
         *
         * Sets up to 6 customer attributes of logged events according to the given object attributes.
         *  A customer attribute can be set only once during a session.
         *  Currently these attributes correspond to database columns custom5...custom10.
         */
        setCustomAttributes(
          /**
           * An json object that includes attribute1...attribute6 (or subset)
           *  with values of type string/number/boolean or a function that returns any of these types.
           *  For example:
           *  {
           *  attribute1: "value3",
           *  attribute2: function () {return "value4"},
           *  attribute3: 55
           *  }
           *  in this example the custom field "custom5" gets the string "value3"
           *  the custom field custom6 gets the function that returns the string "value4",
           *  the custom field custom7 gets a string "55".
           *  Any property of oCustomFieldValues which is not in the range of attribute1...attribute6 is ignored.
           */
          oCustomFieldValues: object
        ): void;
        /**
         * @SINCE 1.32.0
         *
         * Enables the renderer to set the content of the legal message..
         */
        setLegalText(): void;
        /**
         * @SINCE 1.32.0
         *
         * Indicates whether the service is available.
         *
         *
         *
         * Returns `true` if the following conditions exist, and `false` otherwise:
         *  a) Service configuration property `enable` is set to `true`
         *  b) Service configuration property `pubToken` is not empty
         *  c) Agreement text exists or `setUsageAnalyticsPermitted` is set to `false`
         */
        systemEnabled(): boolean;
        /**
         * @SINCE 1.32.0
         *
         * Indicates whether the user has specified to track activities.
         *
         *
         *
         * Returns `true` if the following conditions exist, and `false` otherwise:
         *  a) The function `system enabled` returns `true`
         *  b) The user property `trackUsageAnalytics` is set to `true`
         */
        userEnabled(): boolean;
      }
      /**
       * @SINCE 1.16.3
       *
       * The Unified Shell's user information service, which allows you to retrieve information about the logged-in
       * user.
       */
      class UserInfo {
        /**
         * This method MUST be called by the Unified Shell's container only, others MUST call `sap.ushell.Container.getService("UserInfo")`.
         * Constructs a new instance of the user information service.
         * See:
         * 	sap.ushell.services.Container#getService
         */
        constructor();

        /**
         * @SINCE 1.16.3
         *
         * Returns the id of the user.
         */
        getId(): string;
      }
    }

    namespace components {
      namespace factsheet {
        namespace controls {
          interface $PictureTileSettings extends sap.m.$CustomTileSettings {
            height?: sap.ui.core.CSSSize;

            width?: sap.ui.core.CSSSize;

            pictureDelete?: Function;

            tileContent?:
              | sap.ushell.components.factsheet.controls.PictureViewerItem
              | string;
          }

          interface $PictureViewerSettings
            extends sap.m.$TileContainerSettings {
            /**
             * Percentage of the space occupied by the image in the picture viewer control. Please note that if the
             * factor is too close to 1, the navigation arrows usually displayed in desktop mode will not be available
             */
            tileScaling?: number;

            removable?: boolean;

            pictureDeleted?: Function;

            items?:
              | sap.ushell.components.factsheet.controls.PictureViewerItem[]
              | sap.ushell.components.factsheet.controls.PictureViewerItem;
          }

          interface $PictureViewerItemSettings
            extends sap.ui.core.$ControlSettings {
            src?: string;

            image?: sap.m.Image;
          }
          /**
           * @deprecated (since 1.22) - PictureTile is used in PictureViewer control and is not meant to be consumed
           * outside of PictureViewer usage. PictureViewer was replacing the sap.m.Carousel as it wasn't supporting
           * some versions of MS Internet Explorer. Now, the sap.m.Carousel is fully functional, please use sap.m.Carousel
           * instead. This control will not be supported anymore.
           *
           * Tile control embedding an image and allowing custom sizing
           */
          class PictureTile extends sap.m.CustomTile {
            /**
             * Constructor for a new components/factsheet/controls/PictureTile.
             *
             * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
             * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
             * of the syntax of the settings object.
             */
            constructor(
              /**
               * id for the new control, generated automatically if no id is given
               */
              sId?: string,
              /**
               * initial settings for the new control
               */
              mSettings?: $PictureTileSettings
            );

            /**
             * Attaches event handler `fnFunction` to the {@link #event:pictureDelete pictureDelete} event of this `sap.ushell.components.factsheet.controls.PictureTile`.
             *
             * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
             * otherwise it will be bound to this `sap.ushell.components.factsheet.controls.PictureTile` itself.
             */
            attachPictureDelete(
              /**
               * An application-specific payload object that will be passed to the event handler along with the event
               * object when firing the event
               */
              oData: object,
              /**
               * The function to be called when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object to call the event handler with. Defaults to this `sap.ushell.components.factsheet.controls.PictureTile`
               * itself
               */
              oListener?: object
            ): sap.ushell.components.factsheet.controls.PictureTile;
            /**
             * Detaches event handler `fnFunction` from the {@link #event:pictureDelete pictureDelete} event of this
             * `sap.ushell.components.factsheet.controls.PictureTile`.
             *
             * The passed function and listener object must match the ones used for event registration.
             */
            detachPictureDelete(
              /**
               * The function to be called, when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object on which the given function had to be called
               */
              oListener?: object
            ): sap.ushell.components.factsheet.controls.PictureTile;
            /**
             * Creates a new subclass of class sap.ushell.components.factsheet.controls.PictureTile with name `sClassName`
             * and enriches it with the information contained in `oClassInfo`.
             *
             * `oClassInfo` might contain the same kind of information as described in {@link sap.m.CustomTile.extend}.
             */
            // @ts-ignore
            static extend(
              /**
               * Name of the class being created
               */
              sClassName: string,
              /**
               * Object literal with information about the class
               */
              oClassInfo?: object,
              /**
               * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
               * used by this class
               */
              FNMetaImpl?: Function
            ): Function;
            /**
             * Fires event {@link #event:pictureDelete pictureDelete} to attached listeners.
             */
            firePictureDelete(
              /**
               * Parameters to pass along with the event
               */
              mParameters?: object
            ): sap.ushell.components.factsheet.controls.PictureTile;
            /**
             * Gets current value of property {@link #getHeight height}.
             *
             * Default value is `"32px"`.
             */
            getHeight(): sap.ui.core.CSSSize;
            /**
             * Returns a metadata object for class sap.ushell.components.factsheet.controls.PictureTile.
             */
            // @ts-ignore
            static getMetadata(): sap.ui.core.ElementMetadata;
            /**
             * ID of the element which is the current target of the association {@link #getTileContent tileContent},
             * or `null`.
             */
            getTileContent(): sap.ui.core.ID;
            /**
             * Gets current value of property {@link #getWidth width}.
             *
             * Default value is `"32px"`.
             */
            getWidth(): sap.ui.core.CSSSize;
            /**
             * Sets a new value for property {@link #getHeight height}.
             *
             * When called with a value of `null` or `undefined`, the default value of the property will be restored.
             *
             * Default value is `"32px"`.
             */
            setHeight(
              /**
               * New value for property `height`
               */
              sHeight?: sap.ui.core.CSSSize
            ): sap.ushell.components.factsheet.controls.PictureTile;
            /**
             * Reference to one PictureViewerItem coming from the PictureViewer.
             */
            setTileContent(
              /**
               * Id of an element which becomes the new target of this `tileContent` association. Alternatively, an element
               * instance may be given.
               */
              vTileContent:
                | string
                | sap.ushell.components.factsheet.controls.PictureViewerItem
            ): sap.ushell.components.factsheet.controls.PictureTile;
            /**
             * Sets a new value for property {@link #getWidth width}.
             *
             * When called with a value of `null` or `undefined`, the default value of the property will be restored.
             *
             * Default value is `"32px"`.
             */
            setWidth(
              /**
               * New value for property `width`
               */
              sWidth?: sap.ui.core.CSSSize
            ): sap.ushell.components.factsheet.controls.PictureTile;
            /**
             * Attaches event handler `fnFunction` to the {@link #event:pictureDelete pictureDelete} event of this `sap.ushell.components.factsheet.controls.PictureTile`.
             *
             * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
             * otherwise it will be bound to this `sap.ushell.components.factsheet.controls.PictureTile` itself.
             */
            attachPictureDelete(
              /**
               * The function to be called when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object to call the event handler with. Defaults to this `sap.ushell.components.factsheet.controls.PictureTile`
               * itself
               */
              oListener?: object
            ): sap.ushell.components.factsheet.controls.PictureTile;
          }
          /**
           * @deprecated (since 1.22) - PictureViewer was replacing the Carousel as it wasn't supporting some versions
           * of MS Internet Explorer. Now, the sap.m.Carousel is fully functional, please use sap.m.Carousel instead.
           * This control will not be supported anymore.
           *
           * Picture viewer control relying on the TileContainer control
           */
          class PictureViewer extends sap.m.TileContainer {
            /**
             * Constructor for a new components/factsheet/controls/PictureViewer.
             *
             * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
             * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
             * of the syntax of the settings object.
             */
            constructor(
              /**
               * id for the new control, generated automatically if no id is given
               */
              sId?: string,
              /**
               * initial settings for the new control
               */
              mSettings?: $PictureViewerSettings
            );

            /**
             * @deprecated - Use aggregation "tiles"
             *
             * Adds some item `oItem` to the aggregation named `items`.
             */
            addItem(
              /**
               * the item to add; if empty, nothing is inserted
               */
              oItem: sap.ushell.components.factsheet.controls.PictureViewerItem
            ): sap.ushell.components.factsheet.controls.PictureViewer;
            /**
             * Attaches event handler `fnFunction` to the {@link #event:pictureDeleted pictureDeleted} event of this
             * `sap.ushell.components.factsheet.controls.PictureViewer`.
             *
             * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
             * otherwise it will be bound to this `sap.ushell.components.factsheet.controls.PictureViewer` itself.
             */
            attachPictureDeleted(
              /**
               * An application-specific payload object that will be passed to the event handler along with the event
               * object when firing the event
               */
              oData: object,
              /**
               * The function to be called when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object to call the event handler with. Defaults to this `sap.ushell.components.factsheet.controls.PictureViewer`
               * itself
               */
              oListener?: object
            ): sap.ushell.components.factsheet.controls.PictureViewer;
            /**
             * Removes the picture at index `iIndex` from the `items` aggregation.
             */
            deletePicture(
              /**
               * the `0`-based index of the picture collection to delete; if `iIndex` is out of range or empty, the current
               * image will be deleted.
               */
              iIndex: number
            ): sap.ushell.components.factsheet.controls.PictureViewer;
            /**
             * Destroys all the items in the aggregation {@link #getItems items}.
             */
            destroyItems(): sap.ushell.components.factsheet.controls.PictureViewer;
            /**
             * Detaches event handler `fnFunction` from the {@link #event:pictureDeleted pictureDeleted} event of this
             * `sap.ushell.components.factsheet.controls.PictureViewer`.
             *
             * The passed function and listener object must match the ones used for event registration.
             */
            detachPictureDeleted(
              /**
               * The function to be called, when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object on which the given function had to be called
               */
              oListener?: object
            ): sap.ushell.components.factsheet.controls.PictureViewer;
            /**
             * Creates a new subclass of class sap.ushell.components.factsheet.controls.PictureViewer with name `sClassName`
             * and enriches it with the information contained in `oClassInfo`.
             *
             * `oClassInfo` might contain the same kind of information as described in {@link sap.m.TileContainer.extend}.
             */
            // @ts-ignore
            static extend(
              /**
               * Name of the class being created
               */
              sClassName: string,
              /**
               * Object literal with information about the class
               */
              oClassInfo?: object,
              /**
               * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
               * used by this class
               */
              FNMetaImpl?: Function
            ): Function;
            /**
             * Fires event {@link #event:pictureDeleted pictureDeleted} to attached listeners.
             */
            firePictureDeleted(
              /**
               * Parameters to pass along with the event
               */
              mParameters?: object
            ): sap.ushell.components.factsheet.controls.PictureViewer;
            /**
             * Gets the current picture index.
             */
            getCurrentPictureIndex(): sap.ushell.components.factsheet.controls.PictureViewer;
            /**
             * Gets content of aggregation {@link #getItems items}.
             */
            getItems(): sap.ushell.components.factsheet.controls.PictureViewerItem[];
            /**
             * Returns a metadata object for class sap.ushell.components.factsheet.controls.PictureViewer.
             */
            // @ts-ignore
            static getMetadata(): sap.ui.core.ElementMetadata;
            /**
             * Gets current value of property {@link #getRemovable removable}.
             *
             * Default value is `false`.
             */
            getRemovable(): boolean;
            /**
             * Gets current value of property {@link #getTileScaling tileScaling}.
             *
             * Percentage of the space occupied by the image in the picture viewer control. Please note that if the
             * factor is too close to 1, the navigation arrows usually displayed in desktop mode will not be available
             *
             * Default value is `0.95`.
             */
            getTileScaling(): number;
            /**
             * Checks for the provided `sap.ushell.components.factsheet.controls.PictureViewerItem` in the aggregation
             * {@link #getItems items}. and returns its index if found or -1 otherwise.
             */
            indexOfItem(
              /**
               * The item whose index is looked for
               */
              oItem: sap.ushell.components.factsheet.controls.PictureViewerItem
            ): number;
            /**
             * @deprecated - Use aggregation "tiles"
             *
             * Inserts a item into the aggregation named `items`. When adding a new item to the aggregation, a sap.ca.ui.PictureTile
             * is actually created with its own ID and added to the internal TileContainer.
             */
            insertItem(
              /**
               * the item to insert; if empty, nothing is inserted
               */
              oItem: sap.ushell.components.factsheet.controls.PictureViewerItem,
              /**
               * the `0`-based index the item should be inserted at; for a negative value of `iIndex`, the item is inserted
               * at position 0; for a value greater than the current size of the aggregation, the item is inserted at
               * the last position
               */
              iIndex: number
            ): sap.ushell.components.factsheet.controls.PictureViewer;
            /**
             * Removes all the controls from the aggregation {@link #getItems items}.
             *
             * Additionally, it unregisters them from the hosting UIArea.
             */
            removeAllItems(): sap.ushell.components.factsheet.controls.PictureViewerItem[];
            /**
             * Removes a item from the aggregation {@link #getItems items}.
             */
            removeItem(
              /**
               * The item to remove or its index or id
               */
              vItem:
                | number
                | string
                | sap.ushell.components.factsheet.controls.PictureViewerItem
            ): sap.ushell.components.factsheet.controls.PictureViewerItem;
            /**
             * Select the picture at index `iIndex` from the `items` aggregation.
             */
            selectPicture(
              /**
               * the `0`-based index of the aggregation to select; for a negative value of `iIndex`, the picture at position
               * 0 is selected; for a value greater than the current size of the aggregation, the selected picture at
               * the last position is selected
               */
              iIndex: number
            ): sap.ushell.components.factsheet.controls.PictureViewer;
            /**
             * Sets a new value for property {@link #getRemovable removable}.
             *
             * When called with a value of `null` or `undefined`, the default value of the property will be restored.
             *
             * Default value is `false`.
             */
            setRemovable(
              /**
               * New value for property `removable`
               */
              bRemovable?: boolean
            ): sap.ushell.components.factsheet.controls.PictureViewer;
            /**
             * Sets a new value for property {@link #getTileScaling tileScaling}.
             *
             * Percentage of the space occupied by the image in the picture viewer control. Please note that if the
             * factor is too close to 1, the navigation arrows usually displayed in desktop mode will not be available
             *
             * When called with a value of `null` or `undefined`, the default value of the property will be restored.
             *
             * Default value is `0.95`.
             */
            setTileScaling(
              /**
               * New value for property `tileScaling`
               */
              fTileScaling?: number
            ): sap.ushell.components.factsheet.controls.PictureViewer;
            /**
             * Attaches event handler `fnFunction` to the {@link #event:pictureDeleted pictureDeleted} event of this
             * `sap.ushell.components.factsheet.controls.PictureViewer`.
             *
             * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
             * otherwise it will be bound to this `sap.ushell.components.factsheet.controls.PictureViewer` itself.
             */
            attachPictureDeleted(
              /**
               * The function to be called when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object to call the event handler with. Defaults to this `sap.ushell.components.factsheet.controls.PictureViewer`
               * itself
               */
              oListener?: object
            ): sap.ushell.components.factsheet.controls.PictureViewer;
          }
          /**
           * @deprecated (since 1.22) - PictureViewerItem is used in PictureViewer control and is not meant to be
           * consumed outside of PictureViewer usage. PictureViewer was replacing the Carousel as it wasn't supporting
           * some versions of MS Internet Explorer. Now, the sap.m.Carousel is fully functional, please use sap.m.Carousel
           * instead. This control will not be supported anymore.
           *
           * Picture viewer control relying on the TileContainer control
           */
          class PictureViewerItem extends sap.ui.core.Control {
            /**
             * Constructor for a new components/factsheet/controls/PictureViewerItem.
             *
             * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
             * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
             * of the syntax of the settings object.
             */
            constructor(
              /**
               * id for the new control, generated automatically if no id is given
               */
              sId?: string,
              /**
               * initial settings for the new control
               */
              mSettings?: $PictureViewerItemSettings
            );

            /**
             * Destroys the image in the aggregation {@link #getImage image}.
             */
            destroyImage(): sap.ushell.components.factsheet.controls.PictureViewerItem;
            /**
             * Creates a new subclass of class sap.ushell.components.factsheet.controls.PictureViewerItem with name
             * `sClassName` and enriches it with the information contained in `oClassInfo`.
             *
             * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.Control.extend}.
             */
            // @ts-ignore
            static extend(
              /**
               * Name of the class being created
               */
              sClassName: string,
              /**
               * Object literal with information about the class
               */
              oClassInfo?: object,
              /**
               * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
               * used by this class
               */
              FNMetaImpl?: Function
            ): Function;
            /**
             * Gets content of aggregation {@link #getImage image}.
             */
            getImage(): sap.m.Image;
            /**
             * Returns a metadata object for class sap.ushell.components.factsheet.controls.PictureViewerItem.
             */
            // @ts-ignore
            static getMetadata(): sap.ui.core.ElementMetadata;
            /**
             * Gets current value of property {@link #getSrc src}.
             */
            getSrc(): string;
            /**
             * Sets the aggregated {@link #getImage image}.
             */
            setImage(
              /**
               * The image to set
               */
              oImage: sap.m.Image
            ): sap.ushell.components.factsheet.controls.PictureViewerItem;
            /**
             * Setter for property `src`.
             *
             * Default value is empty/`undefined`
             */
            setSrc(
              /**
               * new value for property `src`
               */
              sSrc: string
            ): sap.ushell.components.factsheet.controls.PictureViewerItem;
          }
        }
      }
    }

    namespace Container {
      /**
       * @SINCE 1.21.1
       *
       * An enumeration for the application work protect mode state.
       */
      namespace DirtyState {
        /**
         * @SINCE 1.21.1
         *
         * The embedded application is clean, there is no unsaved data.
         */
        export const CLEAN: string;

        /**
         * @SINCE 1.21.1
         *
         * The embedded application is dirty, the user has entered data that is not yet saved.
         */
        export const DIRTY: string;

        /**
         * @SINCE 1.21.1
         *
         * The embedded application container's dirty state cannot be determined because of technical reasons.
         */
        export const MAYBE_DIRTY: string;
      }
    }

    namespace ui {
      namespace appfinder {
        interface $AppBoxSettings extends sap.ui.core.$ControlSettings {
          title?: string;

          subtitle?: string;

          icon?: string;

          url?: string;

          navigationMode?: string;

          press?: Function;

          afterRendering?: Function;

          pinButton?: sap.m.Button;
        }
        /**
         * Add your documentation for the newui/appfinder/AppBox
         */
        class AppBox extends sap.ui.core.Control {
          /**
           * Constructor for a new ui/appfinder/AppBox.
           *
           * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
           * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
           * of the syntax of the settings object.
           */
          constructor(
            /**
             * id for the new control, generated automatically if no id is given
             */
            sId?: string,
            /**
             * initial settings for the new control
             */
            mSettings?: $AppBoxSettings
          );

          /**
           * Attaches event handler `fnFunction` to the {@link #event:afterRendering afterRendering} event of this
           * `sap.ushell.ui.appfinder.AppBox`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.appfinder.AppBox` itself.
           */
          attachAfterRendering(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.appfinder.AppBox` itself
             */
            oListener?: object
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:press press} event of this `sap.ushell.ui.appfinder.AppBox`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.appfinder.AppBox` itself.
           */
          attachPress(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.appfinder.AppBox` itself
             */
            oListener?: object
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Destroys the pinButton in the aggregation {@link #getPinButton pinButton}.
           */
          destroyPinButton(): sap.ushell.ui.appfinder.AppBox;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:afterRendering afterRendering} event of this
           * `sap.ushell.ui.appfinder.AppBox`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachAfterRendering(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:press press} event of this `sap.ushell.ui.appfinder.AppBox`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachPress(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Creates a new subclass of class sap.ushell.ui.appfinder.AppBox with name `sClassName` and enriches it
           * with the information contained in `oClassInfo`.
           *
           * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.Control.extend}.
           */
          // @ts-ignore
          static extend(
            /**
             * Name of the class being created
             */
            sClassName: string,
            /**
             * Object literal with information about the class
             */
            oClassInfo?: object,
            /**
             * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
             * used by this class
             */
            FNMetaImpl?: Function
          ): Function;
          /**
           * Fires event {@link #event:afterRendering afterRendering} to attached listeners.
           */
          fireAfterRendering(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Fires event {@link #event:press press} to attached listeners.
           */
          firePress(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Gets current value of property {@link #getIcon icon}.
           */
          getIcon(): string;
          /**
           * Returns a metadata object for class sap.ushell.ui.appfinder.AppBox.
           */
          // @ts-ignore
          static getMetadata(): sap.ui.core.ElementMetadata;
          /**
           * Gets current value of property {@link #getNavigationMode navigationMode}.
           */
          getNavigationMode(): string;
          /**
           * Gets content of aggregation {@link #getPinButton pinButton}.
           */
          getPinButton(): sap.m.Button;
          /**
           * Gets current value of property {@link #getSubtitle subtitle}.
           */
          getSubtitle(): string;
          /**
           * Gets current value of property {@link #getTitle title}.
           */
          getTitle(): string;
          /**
           * Gets current value of property {@link #getUrl url}.
           */
          getUrl(): string;
          /**
           * Sets a new value for property {@link #getIcon icon}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setIcon(
            /**
             * New value for property `icon`
             */
            sIcon?: string
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Sets a new value for property {@link #getNavigationMode navigationMode}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setNavigationMode(
            /**
             * New value for property `navigationMode`
             */
            sNavigationMode?: string
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Sets the aggregated {@link #getPinButton pinButton}.
           */
          setPinButton(
            /**
             * The pinButton to set
             */
            oPinButton: sap.m.Button
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Sets a new value for property {@link #getSubtitle subtitle}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setSubtitle(
            /**
             * New value for property `subtitle`
             */
            sSubtitle?: string
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Sets a new value for property {@link #getTitle title}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setTitle(
            /**
             * New value for property `title`
             */
            sTitle?: string
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Sets a new value for property {@link #getUrl url}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setUrl(
            /**
             * New value for property `url`
             */
            sUrl?: string
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:afterRendering afterRendering} event of this
           * `sap.ushell.ui.appfinder.AppBox`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.appfinder.AppBox` itself.
           */
          attachAfterRendering(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.appfinder.AppBox` itself
             */
            oListener?: object
          ): sap.ushell.ui.appfinder.AppBox;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:press press} event of this `sap.ushell.ui.appfinder.AppBox`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.appfinder.AppBox` itself.
           */
          attachPress(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.appfinder.AppBox` itself
             */
            oListener?: object
          ): sap.ushell.ui.appfinder.AppBox;
        }
      }

      namespace bookmark {
        interface $ContentNodeTreeItemSettings
          extends sap.m.$StandardTreeItemSettings {
          selectable?: boolean;
        }
        /**
         * @SINCE 1.81
         *
         * The Content Node Tree Item is a custom implementation of sap.m.StandardTreeItem to make items unselectable.
         */
        class ContentNodeTreeItem extends sap.m.StandardTreeItem {
          /**
           * Constructor for a new Content Node Tree Item.
           *
           * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
           * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
           * of the syntax of the settings object.
           */
          constructor(
            /**
             * ID for the new control, generated automatically if no ID is given
             */
            sId?: string,
            /**
             * Initial settings for the new control
             */
            mSettings?: $ContentNodeTreeItemSettings
          );

          /**
           * Creates a new subclass of class sap.ushell.ui.bookmark.ContentNodeTreeItem with name `sClassName` and
           * enriches it with the information contained in `oClassInfo`.
           *
           * `oClassInfo` might contain the same kind of information as described in {@link sap.m.StandardTreeItem.extend}.
           */
          // @ts-ignore
          static extend(
            /**
             * Name of the class being created
             */
            sClassName: string,
            /**
             * Object literal with information about the class
             */
            oClassInfo?: object,
            /**
             * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
             * used by this class
             */
            FNMetaImpl?: Function
          ): Function;
          /**
           * Returns a metadata object for class sap.ushell.ui.bookmark.ContentNodeTreeItem.
           */
          // @ts-ignore
          static getMetadata(): sap.ui.core.ElementMetadata;
          /**
           * Gets current value of property {@link #getSelectable selectable}.
           *
           * Default value is `true`.
           */
          getSelectable(): boolean;
          /**
           * Sets a new value for property {@link #getSelectable selectable}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `true`.
           */
          setSelectable(
            /**
             * New value for property `selectable`
             */
            bSelectable?: boolean
          ): sap.ushell.ui.bookmark.ContentNodeTreeItem;
        }
      }

      namespace launchpad {
        namespace section {
          interface $CompactAreaSettings extends sap.ui.core.$ControlSettings {
            showEmptyLinksArea?: boolean;

            showEmptyLinksAreaPlaceHolder?: boolean;

            enableLinkReordering?: boolean;

            /**
             * Fires when a keyboard navigation with arrow keys has reached border.
             */
            borderReached?: Function;

            /**
             * Fires when a control is dropped on the compact area.
             */
            itemDrop?: Function;

            items?: sap.ui.core.Control[] | sap.ui.core.Control;
          }
          /**
           * @SINCE 1.84
           *
           * A container that arranges visualizations controls in the compact area of a section (links).
           */
          class CompactArea extends sap.ui.core.Control {
            /**
             * Constructor for a new sap/ushell/ui/launchpad/section/CompactArea.
             *
             * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
             * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
             * of the syntax of the settings object.
             */
            constructor(
              /**
               * The ID for the new control, generated automatically if no ID is given
               */
              sId?: string,
              /**
               * The initial settings for the new control
               */
              mSettings?: $CompactAreaSettings
            );

            /**
             * Adds some item to the aggregation {@link #getItems items}.
             */
            addItem(
              /**
               * The item to add; if empty, nothing is inserted
               */
              oItem: sap.ui.core.Control
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Attaches event handler `fnFunction` to the {@link #event:borderReached borderReached} event of this `sap.ushell.ui.launchpad.section.CompactArea`.
             *
             * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
             * otherwise it will be bound to this `sap.ushell.ui.launchpad.section.CompactArea` itself.
             *
             * Fires when a keyboard navigation with arrow keys has reached border.
             */
            attachBorderReached(
              /**
               * An application-specific payload object that will be passed to the event handler along with the event
               * object when firing the event
               */
              oData: object,
              /**
               * The function to be called when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.section.CompactArea`
               * itself
               */
              oListener?: object
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Attaches event handler `fnFunction` to the {@link #event:itemDrop itemDrop} event of this `sap.ushell.ui.launchpad.section.CompactArea`.
             *
             * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
             * otherwise it will be bound to this `sap.ushell.ui.launchpad.section.CompactArea` itself.
             *
             * Fires when a control is dropped on the compact area.
             */
            attachItemDrop(
              /**
               * An application-specific payload object that will be passed to the event handler along with the event
               * object when firing the event
               */
              oData: object,
              /**
               * The function to be called when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.section.CompactArea`
               * itself
               */
              oListener?: object
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Destroys all the items in the aggregation {@link #getItems items}.
             */
            destroyItems(): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Detaches event handler `fnFunction` from the {@link #event:borderReached borderReached} event of this
             * `sap.ushell.ui.launchpad.section.CompactArea`.
             *
             * The passed function and listener object must match the ones used for event registration.
             */
            detachBorderReached(
              /**
               * The function to be called, when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object on which the given function had to be called
               */
              oListener?: object
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Detaches event handler `fnFunction` from the {@link #event:itemDrop itemDrop} event of this `sap.ushell.ui.launchpad.section.CompactArea`.
             *
             * The passed function and listener object must match the ones used for event registration.
             */
            detachItemDrop(
              /**
               * The function to be called, when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object on which the given function had to be called
               */
              oListener?: object
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Creates a new subclass of class sap.ushell.ui.launchpad.section.CompactArea with name `sClassName` and
             * enriches it with the information contained in `oClassInfo`.
             *
             * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.Control.extend}.
             */
            // @ts-ignore
            static extend(
              /**
               * Name of the class being created
               */
              sClassName: string,
              /**
               * Object literal with information about the class
               */
              oClassInfo?: object,
              /**
               * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
               * used by this class
               */
              FNMetaImpl?: Function
            ): Function;
            /**
             * Fires event {@link #event:borderReached borderReached} to attached listeners.
             */
            fireBorderReached(
              /**
               * Parameters to pass along with the event
               */
              mParameters?: {
                event?: Object;
              }
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Fires event {@link #event:itemDrop itemDrop} to attached listeners.
             */
            fireItemDrop(
              /**
               * Parameters to pass along with the event
               */
              mParameters?: {
                /**
                 * The control that was dragged.
                 */
                draggedControl?: sap.ui.core.Control;
                /**
                 * The control where the dragged control was dropped.
                 */
                droppedControl?: sap.ui.core.Control;
                /**
                 * A string defining from what direction the dragging happend.
                 */
                dropPosition?: string;
              }
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Gets current value of property {@link #getEnableLinkReordering enableLinkReordering}.
             *
             * Default value is `false`.
             */
            getEnableLinkReordering(): boolean;
            /**
             * Gets content of aggregation {@link #getItems items}.
             */
            getItems(): sap.ui.core.Control[];
            /**
             * Returns a metadata object for class sap.ushell.ui.launchpad.section.CompactArea.
             */
            // @ts-ignore
            static getMetadata(): sap.ui.core.ElementMetadata;
            /**
             * Gets current value of property {@link #getShowEmptyLinksArea showEmptyLinksArea}.
             *
             * Default value is `false`.
             */
            getShowEmptyLinksArea(): boolean;
            /**
             * Gets current value of property {@link #getShowEmptyLinksAreaPlaceHolder showEmptyLinksAreaPlaceHolder}.
             *
             * Default value is `false`.
             */
            getShowEmptyLinksAreaPlaceHolder(): boolean;
            /**
             * Checks for the provided `sap.ui.core.Control` in the aggregation {@link #getItems items}. and returns
             * its index if found or -1 otherwise.
             */
            indexOfItem(
              /**
               * The item whose index is looked for
               */
              oItem: sap.ui.core.Control
            ): number;
            /**
             * Inserts a item into the aggregation {@link #getItems items}.
             */
            insertItem(
              /**
               * The item to insert; if empty, nothing is inserted
               */
              oItem: sap.ui.core.Control,
              /**
               * The `0`-based index the item should be inserted at; for a negative value of `iIndex`, the item is inserted
               * at position 0; for a value greater than the current size of the aggregation, the item is inserted at
               * the last position
               */
              iIndex: number
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Removes all the controls from the aggregation {@link #getItems items}.
             *
             * Additionally, it unregisters them from the hosting UIArea.
             */
            removeAllItems(): sap.ui.core.Control[];
            /**
             * Removes a item from the aggregation {@link #getItems items}.
             */
            removeItem(
              /**
               * The item to remove or its index or id
               */
              vItem: number | string | sap.ui.core.Control
            ): sap.ui.core.Control;
            /**
             * Sets a new value for property {@link #getEnableLinkReordering enableLinkReordering}.
             *
             * When called with a value of `null` or `undefined`, the default value of the property will be restored.
             *
             * Default value is `false`.
             */
            setEnableLinkReordering(
              /**
               * New value for property `enableLinkReordering`
               */
              bEnableLinkReordering?: boolean
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Sets a new value for property {@link #getShowEmptyLinksArea showEmptyLinksArea}.
             *
             * When called with a value of `null` or `undefined`, the default value of the property will be restored.
             *
             * Default value is `false`.
             */
            setShowEmptyLinksArea(
              /**
               * New value for property `showEmptyLinksArea`
               */
              bShowEmptyLinksArea?: boolean
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Sets a new value for property {@link #getShowEmptyLinksAreaPlaceHolder showEmptyLinksAreaPlaceHolder}.
             *
             * When called with a value of `null` or `undefined`, the default value of the property will be restored.
             *
             * Default value is `false`.
             */
            setShowEmptyLinksAreaPlaceHolder(
              /**
               * New value for property `showEmptyLinksAreaPlaceHolder`
               */
              bShowEmptyLinksAreaPlaceHolder?: boolean
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Attaches event handler `fnFunction` to the {@link #event:borderReached borderReached} event of this `sap.ushell.ui.launchpad.section.CompactArea`.
             *
             * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
             * otherwise it will be bound to this `sap.ushell.ui.launchpad.section.CompactArea` itself.
             *
             * Fires when a keyboard navigation with arrow keys has reached border.
             */
            attachBorderReached(
              /**
               * The function to be called when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.section.CompactArea`
               * itself
               */
              oListener?: object
            ): sap.ushell.ui.launchpad.section.CompactArea;
            /**
             * Attaches event handler `fnFunction` to the {@link #event:itemDrop itemDrop} event of this `sap.ushell.ui.launchpad.section.CompactArea`.
             *
             * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
             * otherwise it will be bound to this `sap.ushell.ui.launchpad.section.CompactArea` itself.
             *
             * Fires when a control is dropped on the compact area.
             */
            attachItemDrop(
              /**
               * The function to be called when the event occurs
               */
              fnFunction: Function,
              /**
               * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.section.CompactArea`
               * itself
               */
              oListener?: object
            ): sap.ushell.ui.launchpad.section.CompactArea;
          }
        }

        interface $GridContainerSettings extends sap.ui.core.$ControlSettings {
          groupId?: string;

          showHeader?: boolean;

          defaultGroup?: boolean;

          isLastGroup?: boolean;

          headerText?: string;

          headerLevel?: sap.m.HeaderLevel;

          groupHeaderLevel?: sap.m.HeaderLevel;

          showGroupHeader?: boolean;

          homePageGroupDisplay?: string;

          isGroupLocked?: boolean;

          isGroupSelected?: boolean;

          editMode?: boolean;

          showBackground?: boolean;

          icon?: string;

          showIcon?: boolean;

          enableHelp?: boolean;

          tileActionModeActive?: boolean;

          ieHtml5DnD?: boolean;

          showEmptyLinksArea?: boolean;

          showEmptyLinksAreaPlaceHolder?: boolean;

          supportLinkPersonalization?: boolean;

          tileSizeBehavior?: string;

          afterRendering?: Function;

          titleChange?: Function;

          tileDragStart?: Function;

          tileDragEnter?: Function;

          tileDrop?: Function;

          layoutChange?: Function;

          tiles?: sap.ui.core.Control[] | sap.ui.core.Control;

          links?: sap.ui.core.Control[] | sap.ui.core.Control;

          beforeContent?: sap.ui.core.Control[] | sap.ui.core.Control;

          afterContent?: sap.ui.core.Control[] | sap.ui.core.Control;

          footerContent?: sap.ui.core.Control[] | sap.ui.core.Control;

          headerActions?: sap.ui.core.Control[] | sap.ui.core.Control;
        }

        interface $LinkTileWrapperSettings
          extends sap.ui.core.$ControlSettings {
          uuid?: string;

          tileCatalogId?: string;

          target?: string;

          visible?: boolean;

          debugInfo?: string;

          animationRendered?: boolean;

          isLocked?: boolean;

          tileActionModeActive?: boolean;

          ieHtml5DnD?: boolean;

          press?: Function;

          coverDivPress?: Function;

          afterRendering?: Function;

          showActions?: Function;

          tileViews?: sap.ui.core.Control[] | sap.ui.core.Control;

          footItems?: sap.ui.core.Control[] | sap.ui.core.Control;
        }

        interface $TileStateSettings extends sap.ui.core.$ControlSettings {
          state?: string;

          press?: Function;
        }

        interface $VizInstanceLinkSettings extends sap.m.$GenericTileSettings {
          title?: string;

          subtitle?: string;

          editable?: boolean;

          active?: boolean;

          targetURL?: string;

          mode?: sap.m.GenericTileMode;

          displayFormatHint?: string;

          tileActions?: sap.m.Button[] | sap.m.Button;
        }
        /**
         * @SINCE 1.62
         *
         * A container that arranges Tile and Card controls.
         */
        class GridContainer extends sap.ui.core.Control {
          /**
           * Constructor for a new sap/ushell/ui/launchpad/GridContainer.
           *
           * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
           * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
           * of the syntax of the settings object.
           */
          constructor(
            /**
             * The ID for the new control, generated automatically if no ID is given
             */
            sId?: string,
            /**
             * The initial settings for the new control
             */
            mSettings?: $GridContainerSettings
          );

          /**
           * Adds some afterContent to the aggregation {@link #getAfterContent afterContent}.
           */
          addAfterContent(
            /**
             * The afterContent to add; if empty, nothing is inserted
             */
            oAfterContent: sap.ui.core.Control
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Adds some beforeContent to the aggregation {@link #getBeforeContent beforeContent}.
           */
          addBeforeContent(
            /**
             * The beforeContent to add; if empty, nothing is inserted
             */
            oBeforeContent: sap.ui.core.Control
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Adds some footerContent to the aggregation {@link #getFooterContent footerContent}.
           */
          addFooterContent(
            /**
             * The footerContent to add; if empty, nothing is inserted
             */
            oFooterContent: sap.ui.core.Control
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Adds some headerAction to the aggregation {@link #getHeaderActions headerActions}.
           */
          addHeaderAction(
            /**
             * The headerAction to add; if empty, nothing is inserted
             */
            oHeaderAction: sap.ui.core.Control
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Adds some link to the aggregation {@link #getLinks links}.
           */
          addLink(
            /**
             * The link to add; if empty, nothing is inserted
             */
            oLink: sap.ui.core.Control
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Adds some tile to the aggregation {@link #getTiles tiles}.
           */
          addTile(
            /**
             * The tile to add; if empty, nothing is inserted
             */
            oTile: sap.ui.core.Control
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:afterRendering afterRendering} event of this
           * `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachAfterRendering(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:layoutChange layoutChange} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachLayoutChange(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:tileDragEnter tileDragEnter} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachTileDragEnter(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:tileDragStart tileDragStart} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachTileDragStart(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:tileDrop tileDrop} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachTileDrop(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:titleChange titleChange} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachTitleChange(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Destroys all the afterContent in the aggregation {@link #getAfterContent afterContent}.
           */
          destroyAfterContent(): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Destroys all the beforeContent in the aggregation {@link #getBeforeContent beforeContent}.
           */
          destroyBeforeContent(): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Destroys all the footerContent in the aggregation {@link #getFooterContent footerContent}.
           */
          destroyFooterContent(): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Destroys all the headerActions in the aggregation {@link #getHeaderActions headerActions}.
           */
          destroyHeaderActions(): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Destroys all the links in the aggregation {@link #getLinks links}.
           */
          destroyLinks(): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Destroys all the tiles in the aggregation {@link #getTiles tiles}.
           */
          destroyTiles(): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:afterRendering afterRendering} event of this
           * `sap.ushell.ui.launchpad.GridContainer`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachAfterRendering(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:layoutChange layoutChange} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachLayoutChange(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:tileDragEnter tileDragEnter} event of this
           * `sap.ushell.ui.launchpad.GridContainer`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachTileDragEnter(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:tileDragStart tileDragStart} event of this
           * `sap.ushell.ui.launchpad.GridContainer`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachTileDragStart(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:tileDrop tileDrop} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachTileDrop(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:titleChange titleChange} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachTitleChange(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Creates a new subclass of class sap.ushell.ui.launchpad.GridContainer with name `sClassName` and enriches
           * it with the information contained in `oClassInfo`.
           *
           * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.Control.extend}.
           */
          // @ts-ignore
          static extend(
            /**
             * Name of the class being created
             */
            sClassName: string,
            /**
             * Object literal with information about the class
             */
            oClassInfo?: object,
            /**
             * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
             * used by this class
             */
            FNMetaImpl?: Function
          ): Function;
          /**
           * Fires event {@link #event:afterRendering afterRendering} to attached listeners.
           */
          fireAfterRendering(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Fires event {@link #event:layoutChange layoutChange} to attached listeners.
           */
          fireLayoutChange(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Fires event {@link #event:tileDragEnter tileDragEnter} to attached listeners.
           */
          fireTileDragEnter(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Fires event {@link #event:tileDragStart tileDragStart} to attached listeners.
           */
          fireTileDragStart(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Fires event {@link #event:tileDrop tileDrop} to attached listeners.
           */
          fireTileDrop(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Fires event {@link #event:titleChange titleChange} to attached listeners.
           */
          fireTitleChange(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Gets content of aggregation {@link #getAfterContent afterContent}.
           */
          getAfterContent(): sap.ui.core.Control[];
          /**
           * Gets content of aggregation {@link #getBeforeContent beforeContent}.
           */
          getBeforeContent(): sap.ui.core.Control[];
          /**
           * Gets current value of property {@link #getDefaultGroup defaultGroup}.
           *
           * Default value is `false`.
           */
          getDefaultGroup(): boolean;
          /**
           * Gets current value of property {@link #getEditMode editMode}.
           *
           * Default value is `false`.
           */
          getEditMode(): boolean;
          /**
           * Gets current value of property {@link #getEnableHelp enableHelp}.
           *
           * Default value is `false`.
           */
          getEnableHelp(): boolean;
          /**
           * Gets content of aggregation {@link #getFooterContent footerContent}.
           */
          getFooterContent(): sap.ui.core.Control[];
          /**
           * Gets current value of property {@link #getGroupHeaderLevel groupHeaderLevel}.
           *
           * Default value is `H4`.
           */
          getGroupHeaderLevel(): sap.m.HeaderLevel;
          /**
           * Gets current value of property {@link #getGroupId groupId}.
           */
          getGroupId(): string;
          /**
           * Gets content of aggregation {@link #getHeaderActions headerActions}.
           */
          getHeaderActions(): sap.ui.core.Control[];
          /**
           * Gets current value of property {@link #getHeaderLevel headerLevel}.
           *
           * Default value is `H2`.
           */
          getHeaderLevel(): sap.m.HeaderLevel;
          /**
           * Gets current value of property {@link #getHeaderText headerText}.
           */
          getHeaderText(): string;
          /**
           * Gets current value of property {@link #getHomePageGroupDisplay homePageGroupDisplay}.
           */
          getHomePageGroupDisplay(): string;
          /**
           * Gets current value of property {@link #getIcon icon}.
           *
           * Default value is `"sap-icon://locked"`.
           */
          getIcon(): string;
          /**
           * Gets current value of property {@link #getIeHtml5DnD ieHtml5DnD}.
           *
           * Default value is `false`.
           */
          getIeHtml5DnD(): boolean;
          /**
           * Gets current value of property {@link #getIsGroupLocked isGroupLocked}.
           */
          getIsGroupLocked(): boolean;
          /**
           * Gets current value of property {@link #getIsGroupSelected isGroupSelected}.
           *
           * Default value is `false`.
           */
          getIsGroupSelected(): boolean;
          /**
           * Gets current value of property {@link #getIsLastGroup isLastGroup}.
           *
           * Default value is `false`.
           */
          getIsLastGroup(): boolean;
          /**
           * Gets content of aggregation {@link #getLinks links}.
           */
          getLinks(): sap.ui.core.Control[];
          /**
           * Returns a metadata object for class sap.ushell.ui.launchpad.GridContainer.
           */
          // @ts-ignore
          static getMetadata(): sap.ui.core.ElementMetadata;
          /**
           * Gets current value of property {@link #getShowBackground showBackground}.
           *
           * Default value is `false`.
           */
          getShowBackground(): boolean;
          /**
           * Gets current value of property {@link #getShowEmptyLinksArea showEmptyLinksArea}.
           *
           * Default value is `false`.
           */
          getShowEmptyLinksArea(): boolean;
          /**
           * Gets current value of property {@link #getShowEmptyLinksAreaPlaceHolder showEmptyLinksAreaPlaceHolder}.
           *
           * Default value is `false`.
           */
          getShowEmptyLinksAreaPlaceHolder(): boolean;
          /**
           * Gets current value of property {@link #getShowGroupHeader showGroupHeader}.
           *
           * Default value is `true`.
           */
          getShowGroupHeader(): boolean;
          /**
           * Gets current value of property {@link #getShowHeader showHeader}.
           *
           * Default value is `true`.
           */
          getShowHeader(): boolean;
          /**
           * Gets current value of property {@link #getShowIcon showIcon}.
           *
           * Default value is `false`.
           */
          getShowIcon(): boolean;
          /**
           * Gets current value of property {@link #getSupportLinkPersonalization supportLinkPersonalization}.
           *
           * Default value is `false`.
           */
          getSupportLinkPersonalization(): boolean;
          /**
           * Gets current value of property {@link #getTileActionModeActive tileActionModeActive}.
           *
           * Default value is `false`.
           */
          getTileActionModeActive(): boolean;
          /**
           * Gets content of aggregation {@link #getTiles tiles}.
           */
          getTiles(): sap.ui.core.Control[];
          /**
           * Gets current value of property {@link #getTileSizeBehavior tileSizeBehavior}.
           *
           * Default value is `TILE_SIZE_BEHAVIOR.RESPONSIVE`.
           */
          getTileSizeBehavior(): string;
          /**
           * Checks for the provided `sap.ui.core.Control` in the aggregation {@link #getAfterContent afterContent}.
           * and returns its index if found or -1 otherwise.
           */
          indexOfAfterContent(
            /**
             * The afterContent whose index is looked for
             */
            oAfterContent: sap.ui.core.Control
          ): number;
          /**
           * Checks for the provided `sap.ui.core.Control` in the aggregation {@link #getBeforeContent beforeContent}.
           * and returns its index if found or -1 otherwise.
           */
          indexOfBeforeContent(
            /**
             * The beforeContent whose index is looked for
             */
            oBeforeContent: sap.ui.core.Control
          ): number;
          /**
           * Checks for the provided `sap.ui.core.Control` in the aggregation {@link #getFooterContent footerContent}.
           * and returns its index if found or -1 otherwise.
           */
          indexOfFooterContent(
            /**
             * The footerContent whose index is looked for
             */
            oFooterContent: sap.ui.core.Control
          ): number;
          /**
           * Checks for the provided `sap.ui.core.Control` in the aggregation {@link #getHeaderActions headerActions}.
           * and returns its index if found or -1 otherwise.
           */
          indexOfHeaderAction(
            /**
             * The headerAction whose index is looked for
             */
            oHeaderAction: sap.ui.core.Control
          ): number;
          /**
           * Checks for the provided `sap.ui.core.Control` in the aggregation {@link #getLinks links}. and returns
           * its index if found or -1 otherwise.
           */
          indexOfLink(
            /**
             * The link whose index is looked for
             */
            oLink: sap.ui.core.Control
          ): number;
          /**
           * Checks for the provided `sap.ui.core.Control` in the aggregation {@link #getTiles tiles}. and returns
           * its index if found or -1 otherwise.
           */
          indexOfTile(
            /**
             * The tile whose index is looked for
             */
            oTile: sap.ui.core.Control
          ): number;
          /**
           * Inserts a afterContent into the aggregation {@link #getAfterContent afterContent}.
           */
          insertAfterContent(
            /**
             * The afterContent to insert; if empty, nothing is inserted
             */
            oAfterContent: sap.ui.core.Control,
            /**
             * The `0`-based index the afterContent should be inserted at; for a negative value of `iIndex`, the afterContent
             * is inserted at position 0; for a value greater than the current size of the aggregation, the afterContent
             * is inserted at the last position
             */
            iIndex: number
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Inserts a beforeContent into the aggregation {@link #getBeforeContent beforeContent}.
           */
          insertBeforeContent(
            /**
             * The beforeContent to insert; if empty, nothing is inserted
             */
            oBeforeContent: sap.ui.core.Control,
            /**
             * The `0`-based index the beforeContent should be inserted at; for a negative value of `iIndex`, the beforeContent
             * is inserted at position 0; for a value greater than the current size of the aggregation, the beforeContent
             * is inserted at the last position
             */
            iIndex: number
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Inserts a footerContent into the aggregation {@link #getFooterContent footerContent}.
           */
          insertFooterContent(
            /**
             * The footerContent to insert; if empty, nothing is inserted
             */
            oFooterContent: sap.ui.core.Control,
            /**
             * The `0`-based index the footerContent should be inserted at; for a negative value of `iIndex`, the footerContent
             * is inserted at position 0; for a value greater than the current size of the aggregation, the footerContent
             * is inserted at the last position
             */
            iIndex: number
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Inserts a headerAction into the aggregation {@link #getHeaderActions headerActions}.
           */
          insertHeaderAction(
            /**
             * The headerAction to insert; if empty, nothing is inserted
             */
            oHeaderAction: sap.ui.core.Control,
            /**
             * The `0`-based index the headerAction should be inserted at; for a negative value of `iIndex`, the headerAction
             * is inserted at position 0; for a value greater than the current size of the aggregation, the headerAction
             * is inserted at the last position
             */
            iIndex: number
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Inserts a link into the aggregation {@link #getLinks links}.
           */
          insertLink(
            /**
             * The link to insert; if empty, nothing is inserted
             */
            oLink: sap.ui.core.Control,
            /**
             * The `0`-based index the link should be inserted at; for a negative value of `iIndex`, the link is inserted
             * at position 0; for a value greater than the current size of the aggregation, the link is inserted at
             * the last position
             */
            iIndex: number
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Inserts a tile into the aggregation {@link #getTiles tiles}.
           */
          insertTile(
            /**
             * The tile to insert; if empty, nothing is inserted
             */
            oTile: sap.ui.core.Control,
            /**
             * The `0`-based index the tile should be inserted at; for a negative value of `iIndex`, the tile is inserted
             * at position 0; for a value greater than the current size of the aggregation, the tile is inserted at
             * the last position
             */
            iIndex: number
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Removes a afterContent from the aggregation {@link #getAfterContent afterContent}.
           */
          removeAfterContent(
            /**
             * The afterContent to remove or its index or id
             */
            vAfterContent: number | string | sap.ui.core.Control
          ): sap.ui.core.Control;
          /**
           * Removes all the controls from the aggregation {@link #getAfterContent afterContent}.
           *
           * Additionally, it unregisters them from the hosting UIArea.
           */
          removeAllAfterContent(): sap.ui.core.Control[];
          /**
           * Removes all the controls from the aggregation {@link #getBeforeContent beforeContent}.
           *
           * Additionally, it unregisters them from the hosting UIArea.
           */
          removeAllBeforeContent(): sap.ui.core.Control[];
          /**
           * Removes all the controls from the aggregation {@link #getFooterContent footerContent}.
           *
           * Additionally, it unregisters them from the hosting UIArea.
           */
          removeAllFooterContent(): sap.ui.core.Control[];
          /**
           * Removes all the controls from the aggregation {@link #getHeaderActions headerActions}.
           *
           * Additionally, it unregisters them from the hosting UIArea.
           */
          removeAllHeaderActions(): sap.ui.core.Control[];
          /**
           * Removes all the controls from the aggregation {@link #getLinks links}.
           *
           * Additionally, it unregisters them from the hosting UIArea.
           */
          removeAllLinks(): sap.ui.core.Control[];
          /**
           * Removes all the controls from the aggregation {@link #getTiles tiles}.
           *
           * Additionally, it unregisters them from the hosting UIArea.
           */
          removeAllTiles(): sap.ui.core.Control[];
          /**
           * Removes a beforeContent from the aggregation {@link #getBeforeContent beforeContent}.
           */
          removeBeforeContent(
            /**
             * The beforeContent to remove or its index or id
             */
            vBeforeContent: number | string | sap.ui.core.Control
          ): sap.ui.core.Control;
          /**
           * Removes a footerContent from the aggregation {@link #getFooterContent footerContent}.
           */
          removeFooterContent(
            /**
             * The footerContent to remove or its index or id
             */
            vFooterContent: number | string | sap.ui.core.Control
          ): sap.ui.core.Control;
          /**
           * Removes a headerAction from the aggregation {@link #getHeaderActions headerActions}.
           */
          removeHeaderAction(
            /**
             * The headerAction to remove or its index or id
             */
            vHeaderAction: number | string | sap.ui.core.Control
          ): sap.ui.core.Control;
          /**
           * Removes a link from the aggregation {@link #getLinks links}.
           */
          removeLink(
            /**
             * The link to remove or its index or id
             */
            vLink: number | string | sap.ui.core.Control
          ): sap.ui.core.Control;
          /**
           * Removes a tile from the aggregation {@link #getTiles tiles}.
           */
          removeTile(
            /**
             * The tile to remove or its index or id
             */
            vTile: number | string | sap.ui.core.Control
          ): sap.ui.core.Control;
          /**
           * Sets a new value for property {@link #getDefaultGroup defaultGroup}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setDefaultGroup(
            /**
             * New value for property `defaultGroup`
             */
            bDefaultGroup?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getEditMode editMode}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setEditMode(
            /**
             * New value for property `editMode`
             */
            bEditMode?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getEnableHelp enableHelp}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setEnableHelp(
            /**
             * New value for property `enableHelp`
             */
            bEnableHelp?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getGroupHeaderLevel groupHeaderLevel}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `H4`.
           */
          setGroupHeaderLevel(
            /**
             * New value for property `groupHeaderLevel`
             */
            sGroupHeaderLevel?: sap.m.HeaderLevel
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getGroupId groupId}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setGroupId(
            /**
             * New value for property `groupId`
             */
            sGroupId?: string
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getHeaderLevel headerLevel}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `H2`.
           */
          setHeaderLevel(
            /**
             * New value for property `headerLevel`
             */
            sHeaderLevel?: sap.m.HeaderLevel
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getHeaderText headerText}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setHeaderText(
            /**
             * New value for property `headerText`
             */
            sHeaderText?: string
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getHomePageGroupDisplay homePageGroupDisplay}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setHomePageGroupDisplay(
            /**
             * New value for property `homePageGroupDisplay`
             */
            sHomePageGroupDisplay?: string
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getIcon icon}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `"sap-icon://locked"`.
           */
          setIcon(
            /**
             * New value for property `icon`
             */
            sIcon?: string
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getIeHtml5DnD ieHtml5DnD}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setIeHtml5DnD(
            /**
             * New value for property `ieHtml5DnD`
             */
            bIeHtml5DnD?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getIsGroupLocked isGroupLocked}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setIsGroupLocked(
            /**
             * New value for property `isGroupLocked`
             */
            bIsGroupLocked?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getIsGroupSelected isGroupSelected}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setIsGroupSelected(
            /**
             * New value for property `isGroupSelected`
             */
            bIsGroupSelected?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getIsLastGroup isLastGroup}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setIsLastGroup(
            /**
             * New value for property `isLastGroup`
             */
            bIsLastGroup?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getShowBackground showBackground}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setShowBackground(
            /**
             * New value for property `showBackground`
             */
            bShowBackground?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getShowEmptyLinksArea showEmptyLinksArea}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setShowEmptyLinksArea(
            /**
             * New value for property `showEmptyLinksArea`
             */
            bShowEmptyLinksArea?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getShowEmptyLinksAreaPlaceHolder showEmptyLinksAreaPlaceHolder}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setShowEmptyLinksAreaPlaceHolder(
            /**
             * New value for property `showEmptyLinksAreaPlaceHolder`
             */
            bShowEmptyLinksAreaPlaceHolder?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getShowGroupHeader showGroupHeader}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `true`.
           */
          setShowGroupHeader(
            /**
             * New value for property `showGroupHeader`
             */
            bShowGroupHeader?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getShowHeader showHeader}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `true`.
           */
          setShowHeader(
            /**
             * New value for property `showHeader`
             */
            bShowHeader?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getShowIcon showIcon}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setShowIcon(
            /**
             * New value for property `showIcon`
             */
            bShowIcon?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getSupportLinkPersonalization supportLinkPersonalization}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setSupportLinkPersonalization(
            /**
             * New value for property `supportLinkPersonalization`
             */
            bSupportLinkPersonalization?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getTileActionModeActive tileActionModeActive}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setTileActionModeActive(
            /**
             * New value for property `tileActionModeActive`
             */
            bTileActionModeActive?: boolean
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Sets a new value for property {@link #getTileSizeBehavior tileSizeBehavior}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `TILE_SIZE_BEHAVIOR.RESPONSIVE`.
           */
          setTileSizeBehavior(
            /**
             * New value for property `tileSizeBehavior`
             */
            sTileSizeBehavior?: string
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:afterRendering afterRendering} event of this
           * `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachAfterRendering(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:layoutChange layoutChange} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachLayoutChange(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:tileDragEnter tileDragEnter} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachTileDragEnter(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:tileDragStart tileDragStart} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachTileDragStart(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:tileDrop tileDrop} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachTileDrop(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:titleChange titleChange} event of this `sap.ushell.ui.launchpad.GridContainer`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.GridContainer` itself.
           */
          attachTitleChange(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.GridContainer`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.GridContainer;
        }

        class LinkTileWrapper extends sap.ui.core.Control {
          /**
           * Constructor for a new ui/launchpad/LinkTileWrapper. A link tile to be displayed in the tile container.
           * This control acts as container for specialized tile implementations.
           *
           * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
           * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
           * of the syntax of the settings object.
           */
          constructor(
            /**
             * id for the new control, generated automatically if no id is given
             */
            sId?: string,
            /**
             * initial settings for the new control
             */
            mSettings?: $LinkTileWrapperSettings
          );

          /**
           * Adds some footItem to the aggregation {@link #getFootItems footItems}.
           */
          addFootItem(
            /**
             * The footItem to add; if empty, nothing is inserted
             */
            oFootItem: sap.ui.core.Control
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Adds some tileView to the aggregation {@link #getTileViews tileViews}.
           */
          addTileView(
            /**
             * The tileView to add; if empty, nothing is inserted
             */
            oTileView: sap.ui.core.Control
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:afterRendering afterRendering} event of this
           * `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.LinkTileWrapper` itself.
           */
          attachAfterRendering(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.LinkTileWrapper`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:coverDivPress coverDivPress} event of this `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.LinkTileWrapper` itself.
           */
          attachCoverDivPress(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.LinkTileWrapper`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:press press} event of this `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.LinkTileWrapper` itself.
           */
          attachPress(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.LinkTileWrapper`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:showActions showActions} event of this `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.LinkTileWrapper` itself.
           */
          attachShowActions(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.LinkTileWrapper`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Destroys all the footItems in the aggregation {@link #getFootItems footItems}.
           */
          destroyFootItems(): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Destroys all the tileViews in the aggregation {@link #getTileViews tileViews}.
           */
          destroyTileViews(): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:afterRendering afterRendering} event of this
           * `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachAfterRendering(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:coverDivPress coverDivPress} event of this
           * `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachCoverDivPress(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:press press} event of this `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachPress(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:showActions showActions} event of this `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachShowActions(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Creates a new subclass of class sap.ushell.ui.launchpad.LinkTileWrapper with name `sClassName` and enriches
           * it with the information contained in `oClassInfo`.
           *
           * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.Control.extend}.
           */
          // @ts-ignore
          static extend(
            /**
             * Name of the class being created
             */
            sClassName: string,
            /**
             * Object literal with information about the class
             */
            oClassInfo?: object,
            /**
             * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
             * used by this class
             */
            FNMetaImpl?: Function
          ): Function;
          /**
           * Fires event {@link #event:afterRendering afterRendering} to attached listeners.
           */
          fireAfterRendering(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Fires event {@link #event:coverDivPress coverDivPress} to attached listeners.
           */
          fireCoverDivPress(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Fires event {@link #event:press press} to attached listeners.
           */
          firePress(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Fires event {@link #event:showActions showActions} to attached listeners.
           */
          fireShowActions(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Gets current value of property {@link #getAnimationRendered animationRendered}.
           *
           * Default value is `false`.
           */
          getAnimationRendered(): boolean;
          /**
           * Gets current value of property {@link #getDebugInfo debugInfo}.
           */
          getDebugInfo(): string;
          /**
           * Gets content of aggregation {@link #getFootItems footItems}.
           */
          getFootItems(): sap.ui.core.Control[];
          /**
           * Gets current value of property {@link #getIeHtml5DnD ieHtml5DnD}.
           *
           * Default value is `false`.
           */
          getIeHtml5DnD(): boolean;
          /**
           * Gets current value of property {@link #getIsLocked isLocked}.
           *
           * Default value is `false`.
           */
          getIsLocked(): boolean;
          /**
           * Returns a metadata object for class sap.ushell.ui.launchpad.LinkTileWrapper.
           */
          // @ts-ignore
          static getMetadata(): sap.ui.core.ElementMetadata;
          /**
           * Gets current value of property {@link #getTarget target}.
           */
          getTarget(): string;
          /**
           * Gets current value of property {@link #getTileActionModeActive tileActionModeActive}.
           *
           * Default value is `false`.
           */
          getTileActionModeActive(): boolean;
          /**
           * Gets current value of property {@link #getTileCatalogId tileCatalogId}.
           */
          getTileCatalogId(): string;
          /**
           * Gets content of aggregation {@link #getTileViews tileViews}.
           */
          getTileViews(): sap.ui.core.Control[];
          /**
           * Gets current value of property {@link #getUuid uuid}.
           */
          getUuid(): string;
          /**
           * Gets current value of property {@link #getVisible visible}.
           *
           * Default value is `true`.
           */
          // @ts-ignore
          getVisible(): boolean;
          /**
           * Checks for the provided `sap.ui.core.Control` in the aggregation {@link #getFootItems footItems}. and
           * returns its index if found or -1 otherwise.
           */
          indexOfFootItem(
            /**
             * The footItem whose index is looked for
             */
            oFootItem: sap.ui.core.Control
          ): number;
          /**
           * Checks for the provided `sap.ui.core.Control` in the aggregation {@link #getTileViews tileViews}. and
           * returns its index if found or -1 otherwise.
           */
          indexOfTileView(
            /**
             * The tileView whose index is looked for
             */
            oTileView: sap.ui.core.Control
          ): number;
          /**
           * Inserts a footItem into the aggregation {@link #getFootItems footItems}.
           */
          insertFootItem(
            /**
             * The footItem to insert; if empty, nothing is inserted
             */
            oFootItem: sap.ui.core.Control,
            /**
             * The `0`-based index the footItem should be inserted at; for a negative value of `iIndex`, the footItem
             * is inserted at position 0; for a value greater than the current size of the aggregation, the footItem
             * is inserted at the last position
             */
            iIndex: number
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Inserts a tileView into the aggregation {@link #getTileViews tileViews}.
           */
          insertTileView(
            /**
             * The tileView to insert; if empty, nothing is inserted
             */
            oTileView: sap.ui.core.Control,
            /**
             * The `0`-based index the tileView should be inserted at; for a negative value of `iIndex`, the tileView
             * is inserted at position 0; for a value greater than the current size of the aggregation, the tileView
             * is inserted at the last position
             */
            iIndex: number
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Removes all the controls from the aggregation {@link #getFootItems footItems}.
           *
           * Additionally, it unregisters them from the hosting UIArea.
           */
          removeAllFootItems(): sap.ui.core.Control[];
          /**
           * Removes all the controls from the aggregation {@link #getTileViews tileViews}.
           *
           * Additionally, it unregisters them from the hosting UIArea.
           */
          removeAllTileViews(): sap.ui.core.Control[];
          /**
           * Removes a footItem from the aggregation {@link #getFootItems footItems}.
           */
          removeFootItem(
            /**
             * The footItem to remove or its index or id
             */
            vFootItem: number | string | sap.ui.core.Control
          ): sap.ui.core.Control;
          /**
           * Removes a tileView from the aggregation {@link #getTileViews tileViews}.
           */
          removeTileView(
            /**
             * The tileView to remove or its index or id
             */
            vTileView: number | string | sap.ui.core.Control
          ): sap.ui.core.Control;
          /**
           * Sets a new value for property {@link #getAnimationRendered animationRendered}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setAnimationRendered(
            /**
             * New value for property `animationRendered`
             */
            bAnimationRendered?: boolean
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Sets a new value for property {@link #getDebugInfo debugInfo}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setDebugInfo(
            /**
             * New value for property `debugInfo`
             */
            sDebugInfo?: string
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Sets a new value for property {@link #getIeHtml5DnD ieHtml5DnD}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setIeHtml5DnD(
            /**
             * New value for property `ieHtml5DnD`
             */
            bIeHtml5DnD?: boolean
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Sets a new value for property {@link #getIsLocked isLocked}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setIsLocked(
            /**
             * New value for property `isLocked`
             */
            bIsLocked?: boolean
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Sets a new value for property {@link #getTarget target}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setTarget(
            /**
             * New value for property `target`
             */
            sTarget?: string
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Sets a new value for property {@link #getTileActionModeActive tileActionModeActive}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setTileActionModeActive(
            /**
             * New value for property `tileActionModeActive`
             */
            bTileActionModeActive?: boolean
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Sets a new value for property {@link #getTileCatalogId tileCatalogId}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setTileCatalogId(
            /**
             * New value for property `tileCatalogId`
             */
            sTileCatalogId?: string
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Sets a new value for property {@link #getUuid uuid}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setUuid(
            /**
             * New value for property `uuid`
             */
            sUuid?: string
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Sets a new value for property {@link #getVisible visible}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `true`.
           */
          // @ts-ignore
          setVisible(
            /**
             * New value for property `visible`
             */
            bVisible?: boolean
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:afterRendering afterRendering} event of this
           * `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.LinkTileWrapper` itself.
           */
          attachAfterRendering(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.LinkTileWrapper`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:coverDivPress coverDivPress} event of this `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.LinkTileWrapper` itself.
           */
          attachCoverDivPress(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.LinkTileWrapper`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:press press} event of this `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.LinkTileWrapper` itself.
           */
          attachPress(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.LinkTileWrapper`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:showActions showActions} event of this `sap.ushell.ui.launchpad.LinkTileWrapper`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.LinkTileWrapper` itself.
           */
          attachShowActions(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.LinkTileWrapper`
             * itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.LinkTileWrapper;
        }

        class TileState extends sap.ui.core.Control {
          /**
           * Constructor for a new ui/launchpad/TileState. The tile state control that displays loading indicator,
           * while tile view is loading and failed status in case tile view is not available.
           *
           * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
           * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
           * of the syntax of the settings object.
           */
          constructor(
            /**
             * id for the new control, generated automatically if no id is given
             */
            sId?: string,
            /**
             * initial settings for the new control
             */
            mSettings?: $TileStateSettings
          );

          /**
           * Attaches event handler `fnFunction` to the {@link #event:press press} event of this `sap.ushell.ui.launchpad.TileState`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.TileState` itself.
           */
          attachPress(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.TileState` itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.TileState;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:press press} event of this `sap.ushell.ui.launchpad.TileState`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachPress(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.TileState;
          /**
           * Creates a new subclass of class sap.ushell.ui.launchpad.TileState with name `sClassName` and enriches
           * it with the information contained in `oClassInfo`.
           *
           * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.Control.extend}.
           */
          // @ts-ignore
          static extend(
            /**
             * Name of the class being created
             */
            sClassName: string,
            /**
             * Object literal with information about the class
             */
            oClassInfo?: object,
            /**
             * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
             * used by this class
             */
            FNMetaImpl?: Function
          ): Function;
          /**
           * Fires event {@link #event:press press} to attached listeners.
           */
          firePress(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.launchpad.TileState;
          /**
           * Returns a metadata object for class sap.ushell.ui.launchpad.TileState.
           */
          // @ts-ignore
          static getMetadata(): sap.ui.core.ElementMetadata;
          /**
           * Gets current value of property {@link #getState state}.
           *
           * Default value is `"Loaded"`.
           */
          getState(): string;
          /**
           * Sets a new value for property {@link #getState state}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `"Loaded"`.
           */
          setState(
            /**
             * New value for property `state`
             */
            sState?: string
          ): sap.ushell.ui.launchpad.TileState;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:press press} event of this `sap.ushell.ui.launchpad.TileState`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.launchpad.TileState` itself.
           */
          attachPress(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.launchpad.TileState` itself
             */
            oListener?: object
          ): sap.ushell.ui.launchpad.TileState;
        }
        /**
         * @SINCE 1.84.0
         *
         * Displays header and subheader in a compact link format.
         */
        class VizInstanceLink extends sap.m.GenericTile {
          /**
           * Constructor for a new sap.ushell.ui.launchpad.VizInstanceLink control.
           *
           * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
           * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
           * of the syntax of the settings object.
           */
          constructor(
            /**
             * ID for the new managed object; generated automatically if no non-empty ID is given
             */
            sId?: string,
            /**
             * Optional map/JSON-object with initial property values, aggregated objects etc. for the new object
             */
            mSettings?: $VizInstanceLinkSettings
          );

          /**
           * Adds some tileAction to the aggregation {@link #getTileActions tileActions}.
           */
          addTileAction(
            /**
             * The tileAction to add; if empty, nothing is inserted
             */
            oTileAction: sap.m.Button
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Binds property {@link #getEditable editable} to model data.
           *
           * See {@link sap.ui.base.ManagedObject#bindProperty ManagedObject.bindProperty} for a detailed description
           * of the possible properties of `oBindingInfo`
           */
          bindEditable(
            /**
             * The binding information
             */
            oBindingInfo: object
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Binds property {@link #getSubtitle subtitle} to model data.
           *
           * See {@link sap.ui.base.ManagedObject#bindProperty ManagedObject.bindProperty} for a detailed description
           * of the possible properties of `oBindingInfo`
           */
          bindSubtitle(
            /**
             * The binding information
             */
            oBindingInfo: object
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Binds property {@link #getTitle title} to model data.
           *
           * See {@link sap.ui.base.ManagedObject#bindProperty ManagedObject.bindProperty} for a detailed description
           * of the possible properties of `oBindingInfo`
           */
          bindTitle(
            /**
             * The binding information
             */
            oBindingInfo: object
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Destroys all the tileActions in the aggregation {@link #getTileActions tileActions}.
           */
          destroyTileActions(): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Creates a new subclass of class sap.ushell.ui.launchpad.VizInstanceLink with name `sClassName` and enriches
           * it with the information contained in `oClassInfo`.
           *
           * `oClassInfo` might contain the same kind of information as described in {@link sap.m.GenericTile.extend}.
           */
          // @ts-ignore
          static extend(
            /**
             * Name of the class being created
             */
            sClassName: string,
            /**
             * Object literal with information about the class
             */
            oClassInfo?: object,
            /**
             * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
             * used by this class
             */
            FNMetaImpl?: Function
          ): Function;
          /**
           * Gets current value of property {@link #getActive active}.
           *
           * Default value is `false`.
           */
          getActive(): boolean;
          /**
           * Gets current value of property {@link #getDisplayFormatHint displayFormatHint}.
           *
           * Default value is `DisplayFormatHint.Compact`.
           */
          getDisplayFormatHint(): string;
          /**
           * Gets current value of property {@link #getEditable editable}.
           *
           * Default value is `false`.
           */
          getEditable(): boolean;
          /**
           * Returns a metadata object for class sap.ushell.ui.launchpad.VizInstanceLink.
           */
          // @ts-ignore
          static getMetadata(): sap.ui.core.ElementMetadata;
          /**
           * Gets current value of property {@link #getMode mode}.
           *
           * Default value is `LineMode`.
           */
          // @ts-ignore
          getMode(): sap.m.GenericTileMode;
          /**
           * Gets current value of property {@link #getSubtitle subtitle}.
           *
           * Default value is `empty string`.
           */
          getSubtitle(): string;
          /**
           * Gets current value of property {@link #getTargetURL targetURL}.
           */
          getTargetURL(): string;
          /**
           * Gets content of aggregation {@link #getTileActions tileActions}.
           */
          getTileActions(): sap.m.Button[];
          /**
           * Gets current value of property {@link #getTitle title}.
           *
           * Default value is `empty string`.
           */
          getTitle(): string;
          /**
           * Checks for the provided `sap.m.Button` in the aggregation {@link #getTileActions tileActions}. and returns
           * its index if found or -1 otherwise.
           */
          indexOfTileAction(
            /**
             * The tileAction whose index is looked for
             */
            oTileAction: sap.m.Button
          ): number;
          /**
           * Inserts a tileAction into the aggregation {@link #getTileActions tileActions}.
           */
          insertTileAction(
            /**
             * The tileAction to insert; if empty, nothing is inserted
             */
            oTileAction: sap.m.Button,
            /**
             * The `0`-based index the tileAction should be inserted at; for a negative value of `iIndex`, the tileAction
             * is inserted at position 0; for a value greater than the current size of the aggregation, the tileAction
             * is inserted at the last position
             */
            iIndex: number
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Removes all the controls from the aggregation {@link #getTileActions tileActions}.
           *
           * Additionally, it unregisters them from the hosting UIArea.
           */
          removeAllTileActions(): sap.m.Button[];
          /**
           * Removes a tileAction from the aggregation {@link #getTileActions tileActions}.
           */
          removeTileAction(
            /**
             * The tileAction to remove or its index or id
             */
            vTileAction: number | string | sap.m.Button
          ): sap.m.Button;
          /**
           * Sets a new value for property {@link #getActive active}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setActive(
            /**
             * New value for property `active`
             */
            bActive?: boolean
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Sets a new value for property {@link #getDisplayFormatHint displayFormatHint}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `DisplayFormatHint.Compact`.
           */
          setDisplayFormatHint(
            /**
             * New value for property `displayFormatHint`
             */
            sDisplayFormatHint?: string
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Sets a new value for property {@link #getEditable editable}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setEditable(
            /**
             * New value for property `editable`
             */
            bEditable?: boolean
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Sets a new value for property {@link #getMode mode}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `LineMode`.
           */
          // @ts-ignore
          setMode(
            /**
             * New value for property `mode`
             */
            sMode?: sap.m.GenericTileMode
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Sets a new value for property {@link #getSubtitle subtitle}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `empty string`.
           */
          setSubtitle(
            /**
             * New value for property `subtitle`
             */
            sSubtitle?: string
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Sets a new value for property {@link #getTargetURL targetURL}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setTargetURL(
            /**
             * New value for property `targetURL`
             */
            sTargetURL: string
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Sets a new value for property {@link #getTitle title}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `empty string`.
           */
          setTitle(
            /**
             * New value for property `title`
             */
            sTitle?: string
          ): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Unbinds property {@link #getEditable editable} from model data.
           */
          unbindEditable(): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Unbinds property {@link #getSubtitle subtitle} from model data.
           */
          unbindSubtitle(): sap.ushell.ui.launchpad.VizInstanceLink;
          /**
           * Unbinds property {@link #getTitle title} from model data.
           */
          unbindTitle(): sap.ushell.ui.launchpad.VizInstanceLink;
        }
      }

      namespace shell {
        interface $ToolAreaItemSettings extends sap.ui.core.$ControlSettings {
          /**
           * Icon that is displayed in the item.
           */
          icon?: sap.ui.core.URI;

          /**
           * Defines whether to mark the control as selected
           */
          selected?: boolean;

          text?: string;

          /**
           * @SINCE 1.30
           *
           * Text which will be read by screenreader.
           */
          ariaLabel?: string;

          /**
           * Defines whether to display the control
           */
          visible?: boolean;

          /**
           * Defines whether the control will have an expand functionality containing sub-items or actions. If the
           * property is set to true, a small "expand" icon appears in the lower corner of the control. The "expand"
           * event is fired when the "expand" icon is pressed.
           */
          expandable?: boolean;

          /**
           * Event is fired when the user presses the item.
           */
          press?: Function;

          /**
           * Event is fired when the user presses the Expand icon.
           */
          expand?: Function;
        }
        /**
         * @SINCE 1.30.5
         *
         * A control to be placed in the tool area
         */
        class ToolAreaItem extends sap.ui.core.Control {
          /**
           * Constructor for a new ToolAreaItem.
           *
           * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
           * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
           * of the syntax of the settings object.
           */
          constructor(
            /**
             * id for the new control, generated automatically if no id is given
             */
            sId?: string,
            /**
             * initial settings for the new control
             */
            mSettings?: $ToolAreaItemSettings
          );

          /**
           * Attaches event handler `fnFunction` to the {@link #event:expand expand} event of this `sap.ushell.ui.shell.ToolAreaItem`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.shell.ToolAreaItem` itself.
           *
           * Event is fired when the user presses the Expand icon.
           */
          attachExpand(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.shell.ToolAreaItem` itself
             */
            oListener?: object
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:press press} event of this `sap.ushell.ui.shell.ToolAreaItem`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.shell.ToolAreaItem` itself.
           *
           * Event is fired when the user presses the item.
           */
          attachPress(
            /**
             * An application-specific payload object that will be passed to the event handler along with the event
             * object when firing the event
             */
            oData: object,
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.shell.ToolAreaItem` itself
             */
            oListener?: object
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:expand expand} event of this `sap.ushell.ui.shell.ToolAreaItem`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachExpand(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Detaches event handler `fnFunction` from the {@link #event:press press} event of this `sap.ushell.ui.shell.ToolAreaItem`.
           *
           * The passed function and listener object must match the ones used for event registration.
           */
          detachPress(
            /**
             * The function to be called, when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object on which the given function had to be called
             */
            oListener?: object
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Creates a new subclass of class sap.ushell.ui.shell.ToolAreaItem with name `sClassName` and enriches
           * it with the information contained in `oClassInfo`.
           *
           * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.Control.extend}.
           */
          // @ts-ignore
          static extend(
            /**
             * Name of the class being created
             */
            sClassName: string,
            /**
             * Object literal with information about the class
             */
            oClassInfo?: object,
            /**
             * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
             * used by this class
             */
            FNMetaImpl?: Function
          ): Function;
          /**
           * Fires event {@link #event:expand expand} to attached listeners.
           */
          fireExpand(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Fires event {@link #event:press press} to attached listeners.
           */
          firePress(
            /**
             * Parameters to pass along with the event
             */
            mParameters?: object
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * @SINCE 1.30
           *
           * Gets current value of property {@link #getAriaLabel ariaLabel}.
           *
           * Text which will be read by screenreader.
           */
          getAriaLabel(): string;
          /**
           * Gets current value of property {@link #getExpandable expandable}.
           *
           * Defines whether the control will have an expand functionality containing sub-items or actions. If the
           * property is set to true, a small "expand" icon appears in the lower corner of the control. The "expand"
           * event is fired when the "expand" icon is pressed.
           *
           * Default value is `false`.
           */
          getExpandable(): boolean;
          /**
           * Gets current value of property {@link #getIcon icon}.
           *
           * Icon that is displayed in the item.
           */
          getIcon(): sap.ui.core.URI;
          /**
           * Returns a metadata object for class sap.ushell.ui.shell.ToolAreaItem.
           */
          // @ts-ignore
          static getMetadata(): sap.ui.core.ElementMetadata;
          /**
           * Gets current value of property {@link #getSelected selected}.
           *
           * Defines whether to mark the control as selected
           *
           * Default value is `false`.
           */
          getSelected(): boolean;
          /**
           * Gets current value of property {@link #getText text}.
           */
          getText(): string;
          /**
           * Gets current value of property {@link #getVisible visible}.
           *
           * Defines whether to display the control
           *
           * Default value is `true`.
           */
          // @ts-ignore
          getVisible(): boolean;
          /**
           * @SINCE 1.30
           *
           * Sets a new value for property {@link #getAriaLabel ariaLabel}.
           *
           * Text which will be read by screenreader.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setAriaLabel(
            /**
             * New value for property `ariaLabel`
             */
            sAriaLabel?: string
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Sets a new value for property {@link #getExpandable expandable}.
           *
           * Defines whether the control will have an expand functionality containing sub-items or actions. If the
           * property is set to true, a small "expand" icon appears in the lower corner of the control. The "expand"
           * event is fired when the "expand" icon is pressed.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setExpandable(
            /**
             * New value for property `expandable`
             */
            bExpandable?: boolean
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Sets a new value for property {@link #getIcon icon}.
           *
           * Icon that is displayed in the item.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setIcon(
            /**
             * New value for property `icon`
             */
            sIcon?: sap.ui.core.URI
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Sets a new value for property {@link #getSelected selected}.
           *
           * Defines whether to mark the control as selected
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `false`.
           */
          setSelected(
            /**
             * New value for property `selected`
             */
            bSelected?: boolean
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Sets a new value for property {@link #getText text}.
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           */
          setText(
            /**
             * New value for property `text`
             */
            sText?: string
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Sets a new value for property {@link #getVisible visible}.
           *
           * Defines whether to display the control
           *
           * When called with a value of `null` or `undefined`, the default value of the property will be restored.
           *
           * Default value is `true`.
           */
          // @ts-ignore
          setVisible(
            /**
             * New value for property `visible`
             */
            bVisible?: boolean
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:expand expand} event of this `sap.ushell.ui.shell.ToolAreaItem`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.shell.ToolAreaItem` itself.
           *
           * Event is fired when the user presses the Expand icon.
           */
          attachExpand(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.shell.ToolAreaItem` itself
             */
            oListener?: object
          ): sap.ushell.ui.shell.ToolAreaItem;
          /**
           * Attaches event handler `fnFunction` to the {@link #event:press press} event of this `sap.ushell.ui.shell.ToolAreaItem`.
           *
           * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
           * otherwise it will be bound to this `sap.ushell.ui.shell.ToolAreaItem` itself.
           *
           * Event is fired when the user presses the item.
           */
          attachPress(
            /**
             * The function to be called when the event occurs
             */
            fnFunction: Function,
            /**
             * Context object to call the event handler with. Defaults to this `sap.ushell.ui.shell.ToolAreaItem` itself
             */
            oListener?: object
          ): sap.ushell.ui.shell.ToolAreaItem;
        }
      }

      namespace tile {
        /**
         * Denotes states for control parts and translates into standard SAP color codes
         */
        enum State {
          /**
           * Alias for "Warning"
           */
          Critical,
          /**
           * Indicates a state that is negative, e.g. marking an element that has to get attention urgently or indicates
           * negative values (Red color)
           */
          Error,
          /**
           * Alias for "Error"
           */
          Negative,
          /**
           * Alias for "None"
           */
          Neutral,
          /**
           * Indicates a state that is neutral, e.g. for standard display (Grey color)
           */
          None,
          /**
           * Alias for "Success"
           */
          Positive,
          /**
           * Indicates a state that is positive, e.g. marking a task successfully executed or a state where all is
           * good (Green color)
           */
          Success,
          /**
           * Indicates a state that is critical, e.g. marking an element that needs attention (Orange color)
           */
          Warning
        }
        /**
         * The state of an arrow as trend direction indicator, pointing either up or down
         */
        enum StateArrow {
          /**
           * The trend direction indicator points down
           */
          Down,
          /**
           * The trend direction indicator is invisible
           */
          None,
          /**
           * The trend direction indicator points up
           */
          Up
        }
      }

      interface $ContentNodeSelectorSettings {
        label?: sap.ui.core.Control | string;
      }
      /**
       * @EXPERIMENTAL (since 1.81)
       *
       * The Content Node Selector is used for selecting a group or section as a destination for new bookmark
       * tiles.
       */
      class ContentNodeSelector extends sap.ui.core.XMLComposite {
        /**
         * Constructor for a new Content Node Selector.
         *
         * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
         * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
         * of the syntax of the settings object.
         */
        constructor(
          /**
           * ID for the new control, generated automatically if no ID is given
           */
          sId?: string,
          /**
           * Initial settings for the new control
           */
          mSettings?: $ContentNodeSelectorSettings
        );

        /**
         * Creates a new subclass of class sap.ushell.ui.ContentNodeSelector with name `sClassName` and enriches
         * it with the information contained in `oClassInfo`.
         *
         * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.XMLComposite.extend}.
         */
        // @ts-ignore
        static extend(
          /**
           * Name of the class being created
           */
          sClassName: string,
          /**
           * Object literal with information about the class
           */
          oClassInfo?: object,
          /**
           * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
           * used by this class
           */
          FNMetaImpl?: Function
        ): Function;
        /**
         * ID of the element which is the current target of the association {@link #getLabel label}, or `null`.
         */
        getLabel(): sap.ui.core.ID;
        /**
         * Returns a metadata object for class sap.ushell.ui.ContentNodeSelector.
         */
        // @ts-ignore
        static getMetadata(): sap.ui.core.ElementMetadata;
        /**
         * Sets the associated {@link #getLabel label}.
         */
        setLabel(
          /**
           * ID of an element which becomes the new target of this label association; alternatively, an element instance
           * may be given
           */
          oLabel: sap.ui.core.ID | sap.ui.core.Control
        ): sap.ushell.ui.ContentNodeSelector;
      }
    }

    namespace ui5service {
      /**
       * @deprecated (since 1.70)
       */
      namespace UserStatus {
        /**
         * Creates a new subclass of class sap.ushell.ui5service.UserStatus with name `sClassName` and enriches
         * it with the information contained in `oClassInfo`.
         *
         * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.service.Service.extend}.
         */
        function extend(
          /**
           * Name of the class being created
           */
          sClassName: string,
          /**
           * Object literal with information about the class
           */
          oClassInfo?: object,
          /**
           * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
           * used by this class
           */
          FNMetaImpl?: Function
        ): Function;
        /**
         * Returns a metadata object for class sap.ushell.ui5service.UserStatus.
         */
        function getMetadata(): sap.ui.base.Metadata;
      }

      /**
 * @SINCE 1.38.0
 * 
 * The Unified Shell's ShellUIService service.
 * 
 * This service allows apps to interact with the Fiori Launchpad UI. The service is injected in the app
 * components by the FLP renderer before the corresponding apps start. To consume the service, app components
 * should declare it in their manifest.json as follows:
 * 
 * 
 * ```javascript
 * 
{
   ...
   "sap.ui5": {
      "services" : {
         "ShellUIService": {
             "factoryName": "sap.ushell.ui5service.ShellUIService"
         }
      }
   }
   ...
}
```
 * 
 * 
 * The service can be then retrieved and consumed from the app root component as in the following example:
 * 
 * ```javascript
 * 
// Component.js (the app root component)
...
this.getService("ShellUIService").then( // promise is returned
   function (oService) {
      oService.setTitle("Application Title");
   },
   function (oError) {
      jQuery.sap.log.error("Cannot get ShellUIService", oError, "my.app.Component");
   }
);
...
```
 * 
 * 
 * The ShellUIService can work together with the routing defined in a UI5 app to set title and hierarchy
 * automatically, as the navigation within the app occurs. This can be achieved by enabling the ShellUIService
 * to load instantly and configuring one or both `setTitle` and `setHierarchy` options to `auto` in the
 * app manifest, as shown in the example below:
 * 
 * 
 * ```javascript
 * 
{
   "sap.ui5": {
      "services" : {
         "ShellUIService": {
             "lazy": false,
             "factoryName": "sap.ushell.ui5service.ShellUIService",
             "settings": {
                 "setHierarchy": "auto", // configuration under discussion currently
                 "setTitle": "auto" // configuration under discussion currently
             }
         }
      }
   }
}
```
 * 
 * 
 * Please note that the `setHierarchy` or `setTitle` methods should not be actively called by the application
 * when title and hierarchy are set automatically.
 * 
 * **Note:** Please be aware that the sapFiori2Adaptation configuration of the application may cause the
 * ShellUIService service to work incorrectly. We recommend to disable the sapFiori2Adaptation configuration
 * for the new applications if you use ShellUIService.
 */
      class ShellUIService  {
        /**
         * Returns an instance of the ShellUIService. This constructor must only be called internally by the Fiori
         * Launchpad renderer and never by applications.
         *
         * Instead, this service should be consumed by app components as described in the overview section of this
         * class.
         */
        constructor(
          /**
 * The context in which the service was instantiated. Must have the format: 
 * ```javascript
 * 
{
  scopeType: "component",
  scopeObject: [a UI5 Component in the sap.ushell package]
}
```
 */
          oCallerContext: object
        );

        /**
         * Creates a new subclass of class sap.ushell.ui5service.ShellUIService with name `sClassName` and enriches
         * it with the information contained in `oClassInfo`.
         *
         * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.service.Service.extend}.
         */
        // @ts-ignore
        static extend(
          /**
           * Name of the class being created
           */
          sClassName: string,
          /**
           * Object literal with information about the class
           */
          oClassInfo?: object,
          /**
           * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
           * used by this class
           */
          FNMetaImpl?: Function
        ): Function;
        /**
         * Returns a metadata object for class sap.ushell.ui5service.ShellUIService.
         */
        // @ts-ignore
        static getMetadata(): sap.ui.base.Metadata;
        /**
         * @SINCE 1.38.0
         *
         * Returns the title that was last set via {@link setTitle}.
         */
        getTitle(): string;
        /**
         * @SINCE 1.38.0
         *
         * Displays the given hierarchy in the shell header.
         */
        setHierarchy(
          /**
 * An array representing hierarchies of the currently displayed app. The array should specify title, icon,
 * and navigation intent as shown in the following example:
 * 
 * 
 * ```javascript
 * 
[
    {
        title: "Main View",
        icon: "sap-icon://documents",
        intent: "#Action-sameApp"
    },
    {
        title: "View 2",
        subtitle: "Application view number 2",
        intent: "#Action-sameApp&/View2/"
    },
    {
        title: "View 3",
        subtitle: "Application view number 3",
        intent: "#Action-sameApp&/View3/"
    }
]
```
 * 
 * 
 * The default app hierarchy is applied if no parameter is given.
 */
          aHierarchyLevels?: object[]
        ): void;
        /**
         * @SINCE 1.40.0
         *
         * Used by apps to set related apps. This setting is propagated towards the Shell Header via corresponding
         * events.
         */
        setRelatedApps(
          /**
 * an array of related apps, for example like:
 * 
 * 
 * ```javascript
 * 
[
      {
          title: "App 1",
          icon: "sap-icon://folder",
          subtitle: "go to app 1",
          intent: "#Action-toapp1"
      },
      {
          title: "App 2",
          icon: "sap-icon://folder",
          subtitle: "go to app 2",
          intent: "#Action-toapp2"
      },
      {
          title: "App 3",
          icon: "sap-icon://folder",
          subtitle: "go to app 3",
          intent: "#Action-toapp3"
      }
]
```
 */
          aRelatedApps?: object[]
        ): void;
        /**
         * @SINCE 1.38.0
         *
         * Displays the given title in the shell header. This method should not be called if the app calling the
         * method is not currently displayed in the Fiori Launchpad.
         */
        setTitle(
          /**
           * The new title. The default title is set if this argument is not given.
           */
          sTitle?: string
        ): void;
      }
    }

    interface adapters {}
    /**
     * @SINCE 1.15.0
     *
     * A representation of a system
     */
    class System {
      /**
       * Constructs a new system object representing a system used in the Unified Shell.
       */
      constructor(
        /**
         * An object containing the system data
         */
        oData: {
          /**
           * The unique system alias such as `'ENTERPRISE_SEARCH'`.
           */
          alias: string;
          /**
           * The server relative base URL of this system such as `'/ENTERPRISE_SEARCH'`. **Note:** This has to correspond
           * to an SAP Web Dispatcher routing rule.
           */
          baseUrl: string;
          /**
           * The system platform such as `'abap'` or `'hana'`.
           */
          platform: string;
        }
      );
    }
    /**
     * The type of the content node
     */
    enum ContentNodeType {
      /**
       * A group of the classic homepage
       */
      HomepageGroup,
      /**
       * A page which is assigned to a space in spaces mode
       */
      Page,
      /**
       * A space in spaces mode
       */
      Space
    }
    /**
     * The state of a navigation operation
     */
    enum NavigationState {
      Finished,

      InProgress
    }
  }

  interface IUI5DefineDependencyNames {
    "sap/ushell/renderers/fiori2/Renderer": undefined;

    "sap/ushell/services/AppConfiguration": undefined;

    "sap/ushell/services/AppLifeCycle": undefined;

    "sap/ushell/services/Bookmark": undefined;

    "sap/ushell/services/Configuration": undefined;

    "sap/ushell/services/Container": undefined;

    "sap/ushell/services/ContainerInterface": undefined;

    "sap/ushell/services/CrossApplicationNavigation": undefined;

    "sap/ushell/services/EndUserFeedback": undefined;

    "sap/ushell/services/LaunchPage": undefined;

    "sap/ushell/services/Message": undefined;

    "sap/ushell/services/NavTargetResolution": undefined;

    "sap/ushell/services/Notifications": undefined;

    "sap/ushell/services/Personalization": undefined;

    "sap/ushell/services/PersonalizationContainer": undefined;

    "sap/ushell/services/PersonalizationContainerVariant": undefined;

    "sap/ushell/services/PersonalizationContainerVariantSet": undefined;

    "sap/ushell/services/ShellNavigation": undefined;

    "sap/ushell/services/SmartNavigation": undefined;

    "sap/ushell/services/SupportTicket": undefined;

    "sap/ushell/services/TransientPersonalizer": undefined;

    "sap/ushell/services/URLParsing": undefined;

    "sap/ushell/services/UsageAnalytics": undefined;

    "sap/ushell/services/UserInfo": undefined;

    "sap/ushell/components/factsheet/controls/PictureTile": undefined;

    "sap/ushell/components/factsheet/controls/PictureViewer": undefined;

    "sap/ushell/components/factsheet/controls/PictureViewerItem": undefined;

    "sap/ushell/ui/appfinder/AppBox": undefined;

    "sap/ushell/ui/bookmark/ContentNodeTreeItem": undefined;

    "sap/ushell/ui/launchpad/section/CompactArea": undefined;

    "sap/ushell/ui/launchpad/GridContainer": undefined;

    "sap/ushell/ui/launchpad/LinkTileWrapper": undefined;

    "sap/ushell/ui/launchpad/TileState": undefined;

    "sap/ushell/ui/launchpad/VizInstanceLink": undefined;

    "sap/ushell/ui/shell/ToolAreaItem": undefined;

    "sap/ushell/ui/ContentNodeSelector": undefined;

    "sap/ushell/ui5service/ShellUIService": undefined;

    "sap/ushell/System": undefined;
  }
}
