Ext.define( 'Ext.plugin.NumberPrompt' , {
    extend: "Ext.MessageBox" ,
    requires: [
        'Ext.field.Number'
    ],
    xtype: "numberPrompt" ,
    applyPrompt : function (prompt, oldPrompt) {
        if (prompt) {
            var config = {
                label : false,
                minValue: 0,
                maxValue: 100                
            };

            if (Ext.isObject(prompt)) {
                Ext.apply(config, prompt);
            }

            return Ext.factory(config, Ext.field.Number, oldPrompt);
        }

        return prompt;
    }
});