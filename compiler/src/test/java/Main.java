
import com.sa.pomeditor.PomEditor;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author arunsharma
 */
public class Main {
    
    public static void main(String args[]) {
        
        PomEditor pe = new PomEditor();
        pe.loadProject("/home/arunsharma/MS/research/THS/projects/test-twitter/projects/Untitiled229/pom.xml");
        pe.addProjectDependency("/home/arunsharma/MS/research/THS/projects/test-twitter/plugins/TwitterStream/pom.xml", "cjoka.jar");
        //pe.removeProjectDependency("/home/arunsharma/MS/research/THS/projects/test-twitter/plugins/TwitterStream/pom.xml");
        
    }
}
