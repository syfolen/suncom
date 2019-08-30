/**
 * PureMVC Standard Framework for TypeScript - Copyright © 2012 Frederic Saunier
 * PureMVC Framework - Copyright © 2006-2012 Futurescale, Inc.
 * All rights reserved.

 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of Futurescale, Inc., PureMVC.org, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module puremvc
{
	export interface ICommand
		extends INotifier
	{
		execute( notification:INotification ):void;
	}

	export interface IController
	{
		executeCommand( notification:INotification ):void;
		registerCommand( notificationName:string, commandClassRef:Function ):void;
		hasCommand( notificationName:string ):boolean;
		removeCommand( notificationName:string ):void;
	}

	export interface IFacade
		extends INotifier
	{
		registerCommand( notificationName:string, commandClassRef:Function ):void;
		removeCommand( notificationName:string ): void;
		hasCommand( notificationName:string ):boolean;
		registerProxy( proxy:IProxy ):void;
		retrieveProxy( proxyName:string ):IProxy;
		removeProxy( proxyName:string ):IProxy;
		hasProxy( proxyName:string ):boolean;
		registerMediator( mediator:IMediator ):void;
		retrieveMediator( mediatorName:string ):IMediator;
		removeMediator( mediatorName:string ):IMediator;
		hasMediator( mediatorName:string ):boolean;
		notifyObservers( notification:INotification ):void;
	}

	export interface IMediator
		extends INotifier
	{
		getMediatorName():string;
		getViewComponent():any;
		setViewComponent( viewComponent:any ):void;
		listNotificationInterests( ):string[];
		handleNotification( notification:INotification ):void;
		onRegister():void;
		onRemove():void;
	}

	export interface IModel
	{
		registerProxy( proxy:IProxy ):void;
		removeProxy( proxyName:string ):IProxy;
		retrieveProxy( proxyName:string ):IProxy;
		hasProxy( proxyName:string ):boolean;
	}

	export interface INotification
	{
		getName():string;
		setBody( body:any ):void;
		getBody():any;
		setType( type:string ):void;
		getType():string;
		toString():string;
	}

	export interface INotifier
	{
		sendNotification( name:string, body?:any, type?:string ):void;
	}

	export interface IObserver
	{
		setNotifyMethod( notifyMethod:Function ):void;
		setNotifyContext( notifyContext:any ):void;
		notifyObserver( notification:INotification ):void;
		compareNotifyContext( object:any ):boolean;
	}

	export interface IProxy
		extends INotifier
	{
		getProxyName():string;
		setData( data:any ):void;
		getData():any;
		onRegister( ):void;
		onRemove( ):void;
	}

	export interface IView
	{
		registerObserver( notificationName:string, observer:IObserver ):void;
		removeObserver( notificationName:string, notifyContext:any ):void;
		notifyObservers( notification:INotification ):void;
		registerMediator( mediator:IMediator ):void;
		retrieveMediator( mediatorName:string ):IMediator;
		removeMediator( mediatorName:string ):IMediator;
		hasMediator( mediatorName:string ):boolean;
	}

    export class Observer
		implements IObserver
	{
        public notify: Function;
        public context: any;
        constructor (notifyMethod: Function, notifyContext: any);
        private getNotifyMethod(): Function;
        public setNotifyMethod(notifyMethod: Function): void;
        private getNotifyContext(): any;
        public setNotifyContext(notifyContext: any): void;
        public notifyObserver(notification: INotification): void;
        public compareNotifyContext(object: any): boolean;
    }
	
	export class View
		implements IView
	{
        public mediatorMap: Object;
        public observerMap: Object;
        constructor ();
        public initializeView(): void;
        public registerObserver(notificationName: string, observer: IObserver): void;
        public removeObserver(notificationName: string, notifyContext: any): void;
        public notifyObservers(notification: INotification): void;
        public registerMediator(mediator: IMediator): void;
        public retrieveMediator(mediatorName: string): IMediator;
        public removeMediator(mediatorName: string): IMediator;
        public hasMediator(mediatorName: string): boolean;
        static SINGLETON_MSG: string;
        static instance: IView;
        static getInstance(): IView;
    }


    export class Controller
		implements IController
	{
        public view: IView;
        public commandMap: Object;
        constructor ();
        public initializeController(): void;
        public executeCommand(notification: INotification): void;
        public registerCommand(notificationName: string, commandClassRef: Function): void;
        public hasCommand(notificationName: string): boolean;
        public removeCommand(notificationName: string): void;
        static instance: IController;
        static SINGLETON_MSG: string;
        static getInstance(): IController;
    }

    export class Model
		implements IModel
	{
        public proxyMap: Object;
        constructor ();
        public initializeModel(): void;
        public registerProxy(proxy: IProxy): void;
        public removeProxy(proxyName: string): IProxy;
        public retrieveProxy(proxyName: string): IProxy;
        public hasProxy(proxyName: string): boolean;
        static SINGLETON_MSG: string;
        static instance: IModel;
        static getInstance(): IModel;
    }

    export class Notification
		implements INotification
	{
        public name: string;
        public body: any;
        public type: string;
        constructor (name: string, body?: any, type?: string);
        public getName(): string;
        public setBody(body: any): void;
        public getBody(): any;
        public setType(type: string): void;
        public getType(): string;
        public toString(): string;
    }

    export class Facade
		implements IFacade
	{
        public model: IModel;
        public view: IView;
        public controller: IController;
        constructor ();
        public initializeFacade(): void;
        public initializeModel(): void;
        public initializeController(): void;
        public initializeView(): void;
        public registerCommand(notificationName: string, commandClassRef: Function): void;
        public removeCommand(notificationName: string): void;
        public hasCommand(notificationName: string): boolean;
        public registerProxy(proxy: IProxy): void;
        public retrieveProxy(proxyName: string): IProxy;
        public removeProxy(proxyName: string): IProxy;
        public hasProxy(proxyName: string): boolean;
        public registerMediator(mediator: IMediator): void;
        public retrieveMediator(mediatorName: string): IMediator;
        public removeMediator(mediatorName: string): IMediator;
        public hasMediator(mediatorName: string): boolean;
        public notifyObservers(notification: INotification): void;
        public sendNotification(name: string, body?: any, type?: string): void;
        static SINGLETON_MSG: string;
        static instance: IFacade;
        static getInstance(): IFacade;
    }

    export class Notifier
		implements INotifier
	{
        public facade: IFacade;
        constructor ();
        public sendNotification(name: string, body?: any, type?: string): void;
    }

    export class MacroCommand
		extends Notifier
		implements ICommand, INotifier
	{
        public subCommands: Function[];
        constructor ();
        public initializeMacroCommand(): void;
        public addSubCommand(commandClassRef: Function): void;
        public execute(notification: INotification): void;
    }

    export class SimpleCommand
		extends Notifier
		implements ICommand, INotifier
	{
        public execute(notification: INotification): void;
    }

    export class Mediator
		extends Notifier
		implements IMediator, INotifier
	{
        public mediatorName: string;
        public viewComponent: any;
        constructor (mediatorName?: string, viewComponent?: any);
        public getMediatorName(): string;
        public getViewComponent(): any;
        public setViewComponent(viewComponent: any): void;
        public listNotificationInterests(): string[];
        public handleNotification(notification: INotification): void;
        public onRegister(): void;
        public onRemove(): void;
        static NAME: string;
    }

    export class Proxy
		extends Notifier
		implements IProxy, INotifier
	{
        public proxyName: string;
        public data: any;
        constructor (proxyName?: string, data?: any);
        public getProxyName(): string;
        public setData(data: any): void;
        public getData(): any;
        public onRegister(): void;
        public onRemove(): void;
        static NAME: string;
    }
}
