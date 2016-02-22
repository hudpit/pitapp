Ext.data.JsonP.global({"tagname":"class","name":"global","alternateClassNames":[],"members":[{"name":"autoLoad","tagname":"cfg","owner":"global","id":"cfg-autoLoad","meta":{}},{"name":"autoSync","tagname":"cfg","owner":"global","id":"cfg-autoSync","meta":{}},{"name":"store","tagname":"cfg","owner":"global","id":"cfg-store","meta":{}},{"name":"storeName","tagname":"cfg","owner":"global","id":"cfg-storeName","meta":{}},{"name":"applyStore","tagname":"method","owner":"global","id":"method-applyStore","meta":{"deprecated":{"text":"<p>as of v2.0.0 on an association. Instead use the store configuration.</p>\n\n<p>Creates a function that returns an <a href=\"#!/api/Ext.data.Store\" rel=\"Ext.data.Store\" class=\"docClass\">Ext.data.Store</a> which is configured to load a set of data filtered\nby the owner model's primary key - e.g. in a <code>hasMany</code> association where Group <code>hasMany</code> Users, this function\nreturns a Store configured to return the filtered set of a single Group's Users.</p>\n"},"private":true}},{"name":"read","tagname":"method","owner":"global","id":"method-read","meta":{"private":true}},{"name":"set","tagname":"method","owner":"global","id":"method-set","meta":{}}],"aliases":{},"files":[{"filename":"","href":""}],"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><div class='doc-contents'><p>Global variables and functions.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-autoLoad' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Relation.html#global-cfg-autoLoad' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-cfg-autoLoad' class='name expandable'>autoLoad</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>true to automatically load the related store from a remote source when instantiated. ...</div><div class='long'><p><code>true</code> to automatically load the related store from a remote source when instantiated.</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='cfg-autoSync' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Relation.html#global-cfg-autoSync' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-cfg-autoSync' class='name expandable'>autoSync</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>true to automatically synchronize the related store with the remote source ...</div><div class='long'><p>true to automatically synchronize the related store with the remote source</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='cfg-store' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Relation.html#global-cfg-store' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-cfg-store' class='name expandable'>store</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Optional configuration object that will be passed to the generated Store. ...</div><div class='long'><p>Optional configuration object that will be passed to the generated Store. Defaults to an empty Object.</p>\n</div></div></div><div id='cfg-storeName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Relation.html#global-cfg-storeName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-cfg-storeName' class='name expandable'>storeName</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Optional The name of the store by which you can reference it on this class as a property.</p>\n</div><div class='long'><p>Optional The name of the store by which you can reference it on this class as a property.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-applyStore' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Relation.html#global-method-applyStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-method-applyStore' class='name expandable'>applyStore</a>( <span class='pre'>storeConfig</span> ) : Function<span class=\"signature\"><span class='deprecated' >deprecated</span><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n        <div class='rounded-box deprecated-box deprecated-tag-box'>\n        <p>This method has been <strong>deprected</strong> </p>\n        <p>as of v2.0.0 on an association. Instead use the store configuration.</p>\n\n<p>Creates a function that returns an <a href=\"#!/api/Ext.data.Store\" rel=\"Ext.data.Store\" class=\"docClass\">Ext.data.Store</a> which is configured to load a set of data filtered\nby the owner model's primary key - e.g. in a <code>hasMany</code> association where Group <code>hasMany</code> Users, this function\nreturns a Store configured to return the filtered set of a single Group's Users.</p>\n\n        </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>storeConfig</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Function</span><div class='sub-desc'><p>The store-generating function.</p>\n</div></li></ul></div></div></div><div id='method-read' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Relation.html#global-method-read' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-method-read' class='name expandable'>read</a>( <span class='pre'>record, reader, associationData</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Read associated data ...</div><div class='long'><p>Read associated data</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : <a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a><div class='sub-desc'><p>The record we're writing to.</p>\n</div></li><li><span class='pre'>reader</span> : <a href=\"#!/api/Ext.data.reader.Reader\" rel=\"Ext.data.reader.Reader\" class=\"docClass\">Ext.data.reader.Reader</a><div class='sub-desc'><p>The reader for the associated model.</p>\n</div></li><li><span class='pre'>associationData</span> : Object<div class='sub-desc'><p>The raw associated data.</p>\n</div></li></ul></div></div></div><div id='method-set' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Model2.html#global-method-set' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-method-set' class='name expandable'>set</a>( <span class='pre'>fieldName, value</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the given field to the given value, marks the instance as dirty. ...</div><div class='long'><p>Sets the given field to the given value, marks the instance as dirty.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fieldName</span> : String/Object<div class='sub-desc'><p>The field to set, or an object containing key/value pairs.</p>\n</div></li><li><span class='pre'>value</span> : Object<div class='sub-desc'><p>The value to set.</p>\n</div></li></ul><h3 class='pa'>Fires</h3><ul><li>dirty</li><li>fieldupdate</li></ul></div></div></div></div></div></div></div>","meta":{}});