/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.pomeditor;

import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 *
 * @author arunsharma
 */
public class PomEditor {

    private String file;
    private Node projectNode;
    DocumentBuilderFactory docFactory;
    DocumentBuilder docBuilder;
    Document doc;

    public PomEditor() {

    }

    /**
     * load the supplied document/pom xml file
     *
     * @param path
     */
    public boolean loadProject(String path) {
        this.file = path;
        docFactory = DocumentBuilderFactory.newInstance();
        try {
            docBuilder = docFactory.newDocumentBuilder();
            doc = docBuilder.parse(file);
            this.setprojectNode(this.getDoc().getElementsByTagName("project").item(0));

        } catch (Exception ex) {
            System.out.println("Error while parsing the xml document : " + path);
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean addProjectDependency(String projectPath, String jarPath) {
        PomEditor editor = new PomEditor();
        editor.loadProject(projectPath+"/pom.xml");
        Node _groupId = editor.getDoc().getElementsByTagName("groupId").item(0);
        Node _artifactId = editor.getDoc().getElementsByTagName("artifactId").item(0);
        Node _version = editor.getDoc().getElementsByTagName("version").item(0);

        //check if already added 
        NodeList _gids = doc.getElementsByTagName("groupId");
        for (int i = 0; i < _gids.getLength(); i++) {
            Node _gid = _gids.item(i);
            if (_gid.getTextContent().equalsIgnoreCase(_groupId.getTextContent())) {
                //check for artifac id
                NodeList _aids = doc.getElementsByTagName("artifactId");
                if (_aids.item(i).getTextContent().equalsIgnoreCase(_artifactId.getTextContent())) {
                    return false;
                }
            }
        }

        Node deps = doc.getElementsByTagName("dependencies").item(0);
        if (deps != null) {

            Node dependency = doc.createElement("dependency");
            Node groupId = doc.createElement("groupId");
            groupId.setTextContent(_groupId.getTextContent());
            Node artifactId = doc.createElement("artifactId");
            artifactId.setTextContent(_artifactId.getTextContent());
            Node version = doc.createElement("version");
            version.setTextContent(_version.getTextContent());
//            Node scope = doc.createElement("scope");
//            scope.setTextContent("system");
//            Node sysPath = doc.createElement("systemPath");
//            sysPath.setTextContent(projectPath+"/"+jarPath);

            dependency.appendChild(groupId);
            dependency.appendChild(artifactId);
            dependency.appendChild(version);
//            dependency.appendChild(scope);
//            dependency.appendChild(sysPath);

            deps.appendChild(dependency);
        }

        if (updateFile()) {
            return true;
        }
        return false;
    }

    public boolean removeProjectDependency(String projectPath) {
        PomEditor editor = new PomEditor();
        editor.loadProject(projectPath+"/pom.xml");
        Node _groupId = editor.getDoc().getElementsByTagName("groupId").item(0);
        Node _artifactId = editor.getDoc().getElementsByTagName("artifactId").item(0);
        Node _version = editor.getDoc().getElementsByTagName("version").item(0);

        //check if already added 
        NodeList _gids = doc.getElementsByTagName("groupId");
        for (int i = 0; i < _gids.getLength(); i++) {
            Node _gid = _gids.item(i);
            if (_gid.getTextContent().equalsIgnoreCase(_groupId.getTextContent())) {
                //check for artifac id
                NodeList _aids = doc.getElementsByTagName("artifactId");
                if (_aids.item(i).getTextContent().equalsIgnoreCase(_artifactId.getTextContent())) {
                    Node deps = doc.getElementsByTagName("dependencies").item(0);
                    Node dep = _aids.item(i).getParentNode();
                    deps.removeChild(dep);
                    if (updateFile()) {
                        return true;
                    }
                    return false;
                }
            }
        }
        return false;
    }

    public boolean updateFile() {
        // write the content into xml file
        try {
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(new File(file));
            transformer.transform(source, result);
            return true;
        } catch (Exception ex) {
            System.err.println("Error while updating project : " + file);
            return false;
        }
    }

    public Document getDoc() {
        return doc;
    }

    public void setDoc(Document doc) {
        this.doc = doc;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public Node getprojectNode() {
        return projectNode;
    }

    public void setprojectNode(Node projectNode) {
        this.projectNode = projectNode;
    }

}
