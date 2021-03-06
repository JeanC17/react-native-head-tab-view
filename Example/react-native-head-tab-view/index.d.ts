

import * as React from 'react';
import { Animated, ViewStyle, TextStyle, StyleProp, LayoutChangeEvent, ScrollView, FlatList, SectionList, ScrollViewProps } from 'react-native';

declare class TabViewPageComponent extends React.Component { }
interface TabItemBase<T> {
    item: T;
    index: number;
}

export interface TabItemButtonInfo<T> extends TabItemBase<T> {
    isActive: boolean;
}

export interface TabItemInfo<T> extends TabItemButtonInfo<T> {
    onLayoutTab: (e: LayoutChangeEvent, index: number) => void;
}
interface TabProps<T> {
    /**
     * The data source for Tabbar and TabView
     */
    tabs: Array<T>;
    /**
     * Whether items in a Tabbar divide the width of the container of the Tabbar equally
     * it defaults to true.
     */
    averageTab?: boolean;
    /**
     * Convert the elements in tabs into the titles you want
     * example:
     * tabNameConvert={(tabname)=>return tabname+'_aguai'}
     */
    tabNameConvert?: (tabname: T) => string;
    /**
     * These styles will be applied to the Tabbar view content container which wraps all of the child views. 
     */
    tabsContainerStyle?: StyleProp<ViewStyle>;
    /**
     * The style of the tab item when active
     * defaults to { fontSize: 14, color: '#4D4D4D', fontWeight: 'bold' }
     */
    activeTextStyle?: StyleProp<TextStyle>;
    /**
     * The style of the tab item when inactive
     * defaults to { fontSize: 14, color: '#848484', fontWeight: 'bold' }
     */
    inactiveTextStyle?: StyleProp<TextStyle>;
}

export interface TabbarInfo<T> extends TabProps<T> {
    goToPage: (page: number) => void;
    activeIndex: number;
    scrollValue: Animated.Value;
    style: StyleProp<ViewStyle>;
}

type SceneItem<T> = {
    /**
     * An element in the Tabs array
     */
    item: T;
    /**
     * index 
     */
    index: number;
}

/**
 * This is the Tabview being passed to the HPageViewHoc props.
 * This Props is passed as a parameter to the renderScene method,When the renderScrollHeader for the Tabview is assigned.
 * Example:
 *      <TabView
 *          tabs={this.state.tabs}
 *          renderScene={(sceneProps: HPageViewHocNU<any> & SceneItem<any>)=>{
 *              return <HScrollView {...sceneProps}/>
 *          }}
 *      />
 */
interface HPageViewHocNU<T> {
    frozeTop: number;
    expectHeight: number;
    isActive: boolean;
    containerTrans: Animated.Value;
    headerTrans: Animated.Value;
    refreshTrans: Animated.Value;
    scrollYTrans: Animated.Value;
    dragY: Animated.Value;
    childRefs: Array<React.LegacyRef<any>>;
    addListener: (instance: any, eventName: string, callback: any) => void;
    removeListener: (instance: any, eventName: string, callback: any) => void;
    scenePageDidDrag: (index: number) => void;
    makeHeaderHeight?: () => number;
    faultHeight: number;
    sceneScrollEnabled?: boolean;
    isRefreshingTabView?: boolean
    pulldownEnabled?: boolean
}


export type HPageViewHocProps = {
    /**
     * Whether the scene is refreshing
     */
    isRefreshing?: boolean;
    /**
     * If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality.
     * Make sure to also set the isRefreshing prop correctly.
     */
    onStartRefresh?: () => void;
    /**
     * A custom RefreshControl for scene
     */
    renderRefreshControl?: () => React.ReactElement;
    /**
     * If this height is reached, a refresh event will be triggered （onStartRefresh）
     * it defaults to 100
     */
    refreshHeight?: number;
    /**
     * It's the distance beyond the refreshHeight, the distance to continue the displacement, when the pull is long enough,
     * it defaults to 50.
     */
    overflowPull?: number;
}

export type PageViewHocProps<T> = HPageViewHocProps & HPageViewHocNU<T> & SceneItem<T> & ScrollViewProps;


export interface TabbarProps<T> extends TabbarInfo<T> {
    /**
     * Whether the underline is displayed
     * it defaults to false
     */
    underLineHidden?: boolean;
    /**
     * The style of the underlined container
     */
    underlineStyle?: StyleProp<ViewStyle>;
    /**
     * The style of the underline
     */
    lineStyle?: StyleProp<ViewStyle>;
    /**
     * The style of the tab item
     */
    tabItemStyle?: StyleProp<ViewStyle>;
    /**
     * Takes an item from data and renders it
     */
    renderTabItem?: (info: TabItemInfo<T>) => React.ReactElement;
    /**
     * Takes an item from data and renders it to the TAB Item button
     */
    renderTabItemButton?: (info: TabItemButtonInfo<T>) => React.ReactElement;
    /**
     * Render the view to the left of the Tabbar
     */
    renderLeftView?: () => React.ReactElement | null;
    /**
     * Render the view to the right of the Tabbar
     */
    renderRightView?: () => React.ReactElement | null;
}

export interface TabViewProps<T> extends TabProps<T> {
    /**
     * The style of the Tabview
     */
    style?: StyleProp<ViewStyle>
    /**
     * These styles will be applied to the Tabview content container wraps the tabs,header and footer. 
     * without renderScrollHeader
     */
    contentStyle?: StyleProp<ViewStyle>
    /**
     * Takes an item from tabs and render the scene of the TAB item
     * When renderScrollHeader is assigned, pass info to the component wrapped by HPageViewHoc
     * Example:
     *      <TabView
     *          tabs={this.state.tabs}
     *          renderScene={(sceneProps: HPageViewHocNU<any> & SceneItem<any>)=>{
     *              return <HScrollView {...sceneProps}/>
     *          }}
     *      />
     * 
     */
    renderScene: (info: PageViewHocProps<T> | SceneItem<T>) => React.ReactElement | null | undefined;
    /**
     * The height of collapsible header
     */
    makeHeaderHeight?: () => number;
    /**
     * The height at which the top area of the Tabview is frozen
     * 
     */
    frozeTop?: number;
    /**
     * Gets the Animated.Value for the current active scene
     * You can use it for animation
     */
    makeScrollTrans?: (scrollValue: Animated.Value) => void;
    /**
     * render the collapsible header
     * 
     */
    renderScrollHeader?: () => React.ComponentType<any> | React.ReactElement | null;
    /**
     * render the header of the Tabview
     */
    renderHeader?: (params: { item: T, index: number } | null) => React.ReactElement | null;
    /**
     * 【 This property has been deprecated,By default, the header responds to events. 】
     * Collapsible headers can respond to an event
     * it defaults to false
     */
    headerRespond?: boolean;
    /**
     * render the footer of the Tabview
     */
    renderFooter?: (params: { item: T, index: number } | null) => React.ReactElement | null;
    /**
     * The sequence number of the initial scene
     * it defaults to 0
     */
    initialPage?: number;
    /**
     * Number of pre-loaded pages
     * it defaults to 0
     */
    preInitSceneNum?: number;
    /**
     * Render the custom tabbar
     */
    renderTabBar?: (props: TabbarInfo<T>) => React.ReactElement | null | undefined;
    /**
     * This method is called when the scene is switched
     */
    onChangeTab?(value: ChangeTabProperties): void;
    /**
     * Horizontal scrolling invokes this method
     * value: Progress relative to total length
     */
    onScroll?(value: number): void;
    /**
     * Whether horizontal sliding is allowed
     * it defaults to false
     */
    locked?: boolean;
    /**
     * Whether to allow the scene to slide vertically
     */
    scrollEnabled?: boolean;
    /**
     * The style of the Tabbar
     */
    tabbarStyle?: StyleProp<ViewStyle>;
    /**
     * A marker property for telling the tabview to re-render (since it implements PureComponent).
     * stick it here and treat it immutably.
     */
    extraData?: any;
    /**
     * I'm sure you won't use this property
     * It is used to calculate the height of the scene
     */
    faultHeight?: number;
    /**
     * Whether the TabView is refreshing
     */
    isRefreshing?: boolean;
    /**
     * If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality.
     * Make sure to also set the isRefreshing prop correctly.
     */
    onStartRefresh?: () => void;
    /**
     * A custom RefreshControl
     */
    renderRefreshControl?: () => React.ReactElement;
    /**
     * If this height is reached, a refresh event will be triggered （onStartRefresh）
     */
    refreshHeight?: number;
    /**
     * When true, the scroll view bounces when it reaches the end of the content if it slides the tabs horizontally
     */
    bounces?: boolean;
}


export class TabView<T> extends React.Component<TabViewProps<T>> {

}

export class Tabbar<T> extends React.Component<TabbarProps<T>>{

}

export class RefreshControlAnimated extends React.PureComponent {

}

type HighHocFunc = typeof ScrollView | typeof FlatList | typeof SectionList

declare class PageViewHocComponent<T> extends React.Component<PageViewHocProps<T>>{ }

export function HPageViewHoc(component: HighHocFunc): any;


export interface ChangeTabProperties {
    // The previous page
    from: number;
    // The current page
    curIndex: number;
}

export type RefreshObserverType = (progress: number) => void;

export type RefreshType = 'RefreshTypePrepare' | 'RefreshTypeEnough' | 'RefreshTypeRefreshing'
