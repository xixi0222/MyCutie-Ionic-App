import { Loading, LoadingController, Toast, ToastController } from "ionic-angular";

export abstract class BaseUI{
    constructor(){}
    
    protected showLoading(loadingCtrl:LoadingController,
                          showmsg:string):Loading{
        let loader = loadingCtrl.create({
            content:showmsg,
            dismissOnPageChange:true
        })
        loader.present();
        return loader;

    }

    protected showToast(toastCtrl:ToastController, 
                        showmsg:string):Toast{
        let toast = toastCtrl.create({
            message:showmsg, 
            duration:3000,
            position:'top'
        });
        toast.present();
        return toast;
    }
}