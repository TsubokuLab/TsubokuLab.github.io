---
layout: default
title: VRCHaptics
---

![vrchaptics_vrchat](images\vrchaptics_vrchat.jpg)

## ソフトウェア概要

bHaptics社の販売する触覚スーツ(https://www.bhaptics.com/)をVRChat等のソフトと連動して動作させるためのソフトウェア、及びVRChatアバターに設定するためのPrefabとUnityエディター拡張機能。
`※使用するにはVRChatSDK及びUnityを使ったVRChatのアバターアップロードについての知識が必要です。`

現在は

* Tactot --- ベスト
* Tactosy --- 腕
* Tactal --- 頭

の3デバイスに対応。

* Tactosy for Hands --- グローブ
* Tactosy for Feet --- 足

の2種類はまだデバイスを入手出来ていないので対応未定。

## 仕組み
①触覚ベストやアームデバイスに接近したオブジェクトをアバターのカメラで撮影し、RenderTextureを画面上の固定位置に表示。
②そのRenderTextureをVRCHapticsアプリで画面キャプチャーし、色情報→デバイスの振動に変換しています。

## 使い方

## 1. デバイスの接続

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

   

### 3. キャプチャアプリケーションの変更

起動後、場合によってはキャプチャするアプリケーションにVRChatが選択されていない事があります。
その場合は以下の手順でVRChatを選択して下さい。

1. 上部のマウスカーソルを合わせると「Change Application」と表示される部分でマウスを左クリック

![VRCHaptics_02](images\VRCHaptics_02.png)

2. アプリケーション一覧が表示されるのでスクロールして起動中のVRChatを選択する。

![VRCHaptics_03](images\VRCHaptics_03.png)

### 4. 設定するデバイスの変更

![VRCHaptics_04](images\VRCHaptics_04.png)

![VRCHaptics_05](images\VRCHaptics_05.png)

![VRCHaptics_06](images\VRCHaptics_06.png)

## 内容物
* VRCHaptics.exe --- アプリ本体
* VRCHaptics_settings.xml --- VRCHapicsの設定ファイル
* VRCHaptics-VRChat.unitypackage --- VRChat用アセットUnityPackage

## VRChat用アセットUnityPackage
VRCHaptics-VRChat

└ Prefabs

  ├ Hidden

  │ ├ VRCHaptics_Vest_hidden.prefab

  │ ├ VRCHaptics_LeftArm_hidden.prefab

  │ ├ VRCHaptics_RightArm_hidden.prefab

  │ └ VRCHaptics_Head_hidden.prefab

  └ Visualized

​    ├ VRCHaptics_Vest_visualized.prefab

​    ├ VRCHaptics_LeftArm_visualized.prefab

​    ├ VRCHaptics_RightArm_visualized.prefab

​    └ VRCHaptics_Head_visualized.prefab

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