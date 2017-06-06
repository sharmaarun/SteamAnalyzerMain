/**
 * The MIT License (MIT)
 * Copyright (c) 2016 SciNet[THS Team] @ UPRM
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
package com.sa.plugins;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.Serializable;
import java.util.Map;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.streaming.api.java.JavaDStream;

/**
 *
 * @author arunsharma
 */
public class FilterProcessor implements Serializable {

    public FilterProcessor() {

    }

    /**
     * filter out the stream of data base on search item fields from the UI
     *
     * @param fields
     * @param input
     * @param output
     * @return
     */
    public static JavaDStream<String> process(Map<String, String> fields, JavaDStream<String> input, JavaDStream<String> output) {

        String items = fields.get("items");
        String args = fields.get("args");
        String[] itemsArr = items.length() > 0 ? items.split(",") : null;
        String[] argsArr = args.length() > 0 ? args.split(",") : null;
        System.out.println("Searching for " + items + " in " + args);

        output = input.filter(new Function<String, Boolean>() {
            @Override
            public Boolean call(String t1) throws Exception {
                    System.out.println(t1);
                    if (itemsArr == null || itemsArr.length <= 0) {
                        return true;
                    }
                    boolean found = false;
                    JsonNode node = null;
                    if (argsArr != null) {
                        node = new ObjectMapper().readTree(t1);
                    }
                    for (String i : itemsArr) {
                        if (argsArr != null) {
                            for (String arg : argsArr) {
                                if (node.get(arg).asText().contains(i.toLowerCase())) {
                                    found = true;
                                    System.out.println("Match Found!");
                                    break;
                                }
                            }
                        } else if (t1.contains(i.toLowerCase())) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });

        return output;

    }

}
