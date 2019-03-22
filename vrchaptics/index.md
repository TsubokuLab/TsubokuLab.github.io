---

layout: default  
title: VRCHaptics  
description: This is just another page

---

![vrchaptics_vrchat](images\vrchaptics_vrchat.jpg)

* [概要](#概要)
* [仕組み](#仕組み)
* [使い方](#使い方)
  * [デバイスの接続](#1-デバイスの接続)
  * [アプリの起動](#2-アプリの起動)
  * [キャプチャアプリケーションを選択](#3-キャプチャアプリケーションを選択)
  * [設定するデバイスの選択](#4-設定するデバイスの選択)
  * [デバイスの振動を有効にする](#5-デバイスの振動を有効にする)
  * [振動強度を変更](#6-振動強度を変更)
  * [アプリのClip位置を調節する](#7-アプリのClip位置を調節する)
  * [アプリケーションを終了する](#8-アプリケーションを終了する)
* [内容物](#内容物)
* [VRChat用UnityPackage](#VRChat用UnityPackage)
* [デモワールド](#デモワールド)
* [推奨動作環境](#推奨動作環境)
* [使用前の注意事項](#使用前の注意事項)
* [利用規約](#利用規約)
* [クレジット](#クレジット)

------

## 概要

bHaptics社の販売する触覚スーツ(https://www.bhaptics.com/)をVRChat等のソフトと連動して動作させるためのソフトウェアです。  
VRChatアバターに設定するための各種PrefabとUnityエディター拡張スクリプトの専用アセット(UnityPackage)と共に使用します。

`※使用するにはVRChatSDK及びUnityを使ったVRChatのアバターアップロードについての知識が必要です。`

現在は

| デバイス名称 | 説明 |
| ------------ | ---- |
| Tactot       | 胴体 |
| Tactosy      | 両腕 |
| Tactal       | 頭   |

の3デバイスに対応。

| デバイス名称      | 説明           |
| :---------------- | -------------- |
| Tactosy for Hands | グローブ(両手) |
| Tactosy for Feet  | 両足           |

の2種類はまだデバイスを入手出来ていないので対応未定。

## 仕組み
1. 触覚ベストやアームデバイスに接近したオブジェクトをVRChat上のアバターカメラで撮影し、RenderTextureを画面上の固定位置に表示
2. そのRenderTextureをVRCHapticsアプリで画面キャプチャー
3. 色情報→振動に変換してbHapticsデバイスを制御

## 使い方

### 1. デバイスの接続

1. **bHaptics公式サイト**から**[bHaptics Player](https://www.bhaptics.com/download)**アプリをインストールし起動

2. **歯車マーク**をクリックして設定画面を表示する  

   ![bHapticsPlayer_04](images\bHapticsPlayer_04.png)

3. デバイスの電源ボタンを押していき、**Scanned Devices**に表示されたら**Pair**ボタンを押下してペアリングを完了させる。  

   ![bHapticsPlayer_01](images\bHapticsPlayer_01.png)

4. ペアリングが完了するとデバイスのアイコンに色が着く  

   ![bHapticsPlayer_03](images\bHapticsPlayer_03.png)

5. もし腕デバイス(Tactosy)が2台とも右手に設定されたりした場合は、下部の**Device Position**で変更する。  

   ![bHapticsPlayer_02](images\bHapticsPlayer_02.png)

これでデバイスの準備は完了です。  

### 2. アプリの起動

1. **VRCHaptics.exe**を起動  
   ![VRCHaptics_01](images\VRCHaptics_01.png)

   

### 3. キャプチャアプリケーションを選択

起動後、場合によってはキャプチャするアプリケーションにVRChatが選択されていない事があります。
その場合は以下の手順でVRChatを選択して下さい。

1. 上部のマウスカーソルを合わせると「Change Application」と表示される部分でマウスを左クリック  
   ![VRCHaptics_02](images\VRCHaptics_02.png)

2. アプリケーション一覧が表示されるのでスクロールして起動中のVRChatを選択する。  
   ![VRCHaptics_03](images\VRCHaptics_03.png)

### 4. 設定するデバイスの選択

1. Device Typeの右のプルダウンメニューから設定したいデバイスを選択  
   ![VRCHaptics_04](images\VRCHaptics_04.png)

### 5. デバイスの振動を有効にする

1. EnableチェックをクリックしてONにする  
   ![VRCHaptics_05](images\VRCHaptics_05.png)
2. Status表記がRunningになれば動作状態  
   ![VRCHaptics_06](images\VRCHaptics_06.png)

### 6. 振動強度を変更

1. Powerスライダーをドラッグして数値を変更する

### 7. アプリのClip位置を調節する

1. Clip PositionのX,Y,W,Hスライダーをドラッグして数値を調整する。

   | パラメーター | 説明                                   |
   | ------------ | -------------------------------------- |
   | X            | 切り出し位置のX座標。画面の一番左が0。 |
   | Y            | 切り出し位置のY座標。画面の一番上が0。 |
   | W            | 切り出しサイズの横幅pixel数。          |
   | H            | 切り出しサイズの縦幅pixel数。          |

   なお、右のテキストボックスの数値を直接入力しても変更可能。

2. デフォルトの状態に戻すにはDefaultボタンを押下して下さい。

### 8. アプリケーションを終了する

1. 右上の✕ボタンを押してアプリケーションを閉じる。
   設定したパラメーターは保存され次回起動時に自動で読み込まれます。

## 内容物
* VRCHaptics.exe --- アプリ本体
* VRCHaptics_settings.xml --- VRCHapicsの設定ファイル
* VRCHaptics-VRChat.unitypackage --- VRChat用アセットUnityPackage

## VRCHaptics対応アバターセットアップ手順

### VRCHaptics-VRChat.unitypackageをインポート

1. UnityPackageをインポートする  
   ```
   VRCHaptics-VRChat
   └ Prefabs
     ├ Hidden
     │ ├ VRCHaptics_Vest_hidden.prefab
     │ ├ VRCHaptics_LeftArm_hidden.prefab
     │ ├ VRCHaptics_RightArm_hidden.prefab
     │ └ VRCHaptics_Head_hidden.prefab
     └ Visualized
       ├ VRCHaptics_Vest_visualized.prefab
       ├ VRCHaptics_LeftArm_visualized.prefab
       ├ VRCHaptics_RightArm_visualized.prefab
       └ VRCHaptics_Head_visualized.prefab```
   ```

2. 触覚スーツ用Prefabをアバターに合わせて配置していく  
   PrefabにはHidden(可視化モデル無し)とVisualized(可視化モデル有り)の2パターンがあります。

   |      |      |
   | ---- | ---- |
   |      |      |
   |      |      |
   |      |      |

   

3. VRCHapticsHelperを使ってアバターをセットアップする

   1. Unityの上部メニューから `Tools/VRCHapticsHelper` を選択
   2. 表示

   ```
   
   ```

### デモ用ワールド
URL:

```※ペデスタルやClone Avatar等で同じワールド内に同じアバターが複数存在すると、RenderTextureが共通になってしまい正しく動作しなくなります。１つのペデスタルを利用するのは１人までとして下さい。```

## 推奨動作環境
* Windows10
* GPU: Nvidia GeForce GTX1060 以上
* CPU: Intel Core i7 以上

## 使用前の注意事項
元々、触覚スーツbHapticsに非対応のVRChat等のアプリケーションを半ば無理やり対応させている為、動作条件にいくつか制限があります。
以下をご了承の上ご利用下さい。

* ウィンドウキャプチャを使用するためCPUリソースを多く消費します。スペックが不足していたりVRChatの高負荷なワールド・人の多い場所ではVRの動作に影響が出る可能性があります。
* 画面上にタッチ情報を表示するため、VRChatの**StreamCamera**との併用ができません。(画面が上書きされてしまう為)
* **PostProcessing（主にBloomやColorGrading)が有効**のワールドでは誤動作する場合があります。（判定用テクスチャの色が変化してしまうため）
* タッチ位置フィードバック用の触覚デバイスPrefab(Visualized)には、仕様上LocalPlayerレイヤーを描画するカメラを使用しているため、使用者のアバター自身によるタッチ位置も写り込んでしまいます。**アバターに両面描画シェーダーを使用していたり複雑な服装を着ている場合は肌や服もタッチ位置として写り込んでしまう可能性**があるのでご注意下さい。（振動制御には別の判定用カメラを使用しているので、自分のタッチで振動することはありません。Hidden Prefabを使用している場合も同様に影響ありません。）
* **VRモード&フルスクリーン起動**での動作を想定しています。フルスクリーンでない場合は、Shiftキーを押しながらVRChatを起動し、Windowedのチェックを外して起動して下さい。また、デスクトップモードで使用する場合はClip Positionの範囲を調整してください。

/*
・判定用カメラの表示レイヤー
UI/UIMenu/LocalPlayer/MirrorReflectionを外す
MirrorReflectionを外さないとLocalPlayerを外していても自分の体のメッシュが反応してしまう。

・プレビュー用のカメラの表示レイヤー
UI/UIMenu/MirrorReflectionを外す
LocalPlayerを外していても自分の体のメッシュが反応してしまう。
*/



## 利用規約

* 個人利用に限り商用利用可能（法人利用はお問い合わせ下さい）
* 中のデータを取り出せる形での再配布は不可(VRChatのアバターペデスタル等は使用可能)
* 改変可能
* 本データを利用したことによる損害

## クレジット

VRCHaptics.exeには @hecomi様 の **uWindowCapture** を使用させて頂いています。

* uWindowCapture (MIT)
  https://github.com/hecomi/uWindowCapture

また、アバターセットアップ用のUnityエディタ拡張機能の開発には @izm様 の **UnityWearChangeSupporter** を参考にさせて頂きました。

* UnityWearChangeSupporter (MIT)
  https://neon-izm.booth.pm/items/1273588