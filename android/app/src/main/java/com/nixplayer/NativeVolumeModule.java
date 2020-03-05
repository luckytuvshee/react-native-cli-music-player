package com.nixplayer;

import android.content.Context;
import android.media.AudioManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class NativeVolumeModule extends ReactContextBaseJavaModule {

    public ReactApplicationContext mContext;
    public AudioManager audioManager;

    public NativeVolumeModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
        mContext = reactContext;
        audioManager = (AudioManager) mContext.getApplicationContext().getSystemService(Context.AUDIO_SERVICE);
    }

    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() {
        return "NativeVolume";
    }

    @ReactMethod
    public void volumeUp(Callback errorCallback, Callback successCallback) {
        try {
           int volume = audioManager.getStreamVolume(3); // STREAM_MUSIC is 3
           int maxVolume = audioManager.getStreamMaxVolume(3);
           if(volume < maxVolume)
               audioManager.setStreamVolume(3, volume + 1, 0);


           System.out.println("Callback : Volume up set to " + volume);
           volume = audioManager.getStreamVolume(3);
           successCallback.invoke(volume);

            // audioManager.adjustVolume(AudioManager.ADJUST_RAISE, 3);
            // successCallback.invoke("Volume up");
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void volumeDown(Callback errorCallback, Callback successCallback) {
        try {
           int volume = audioManager.getStreamVolume(3); // STREAM_MUSIC is 3
           if(volume > 0)
               audioManager.setStreamVolume(3, volume - 1, 0);

           System.out.println("Callback : Volume down set to " + volume);
           volume = audioManager.getStreamVolume(3);
           successCallback.invoke(volume);

            // audioManager.adjustVolume(AudioManager.ADJUST_LOWER, 3);
            // successCallback.invoke("Volume down");
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void getVolume(Callback errorCallback, Callback successCallback) {
        try {
            int volume = audioManager.getStreamVolume(3); // STREAM_MUSIC is 3
            int maxVolume = audioManager.getStreamMaxVolume(3);
            successCallback.invoke(volume);
        } catch(IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }

    }
}
