# jQuery-fcs

jQuery-fcsは、多くのWindowsネイティブアプリケーションのようにエンターキーでフォームエレメントのフォーカスを移動させる為のjQueryプラグインです。

##### 例

https://feijoa-pine.github.io/jquery-fcs/

## 必要要件

* jQuery

## 使い方

フォーカスを移動させたいフォームエレメントに**任意**のクラスを指定してください。

###### 例

```
<input type="text" class="fcs"><br>
<textarea class="fcs"></textarea><br>
<input type="text" class="fcs"><br>
<button type="submit" class="fcs">submit</button>
```

あとは、任意のタイミングで指定したクラスをjQuery-fcsに登録するだけです。

###### 例

```
$(function()
{
    // エンターキーで入力フォームを移動するフォームエレメントのクラスを指定する
    $(document).fcs(".fcs");
});
```

## フォーカスの移動方法

1. エンターキーで次のフォームエレメントに移動します。
2. Shift+エンターキーで前のフォームエレメントに移動します。
3. 入力が行われた<textarea/>では、ctrl+エンターキーで次のフォームエレメントに移動します。

## 高度な使い方

フォームエレメントに指定するクラスを分けることで、フォーカスをグループ化出来ます。

###### 例

```
$(function()
{
    // エンターキーで入力フォームを移動するフォームエレメントのクラスを指定する
    $(document).fcs(".fcs");
    $(document).fcs(".fcs1");
    $(document).fcs(".fcs2");
               :
});
```

## License

MIT License.
