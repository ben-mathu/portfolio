import { Injectable } from '@angular/core';
import { child, Database, get, onValue, push, ref, remove, set, update } from '@angular/fire/database';
import { AchievementDetails, ArticleDetails, CertificateDetails, ExperienceDetails, JournalDetails, ProjectDetail } from '../../models/header/portfolio.model';
import { AchievementElement, ArticleElement, CertificateElement, ExperienceElement, JournalElement, ProjectElement } from '../../models/header/portfolio.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { MyDetails } from '../../models/header/header';
import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  baseEndpoint: string = 'public';

  constructor(private database: Database, private http: HttpClient, private authService: AuthService) {}

  onAuthStateChanged(auth: Auth): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      onAuthStateChanged(auth, (user) => { resolve(user) }, (error) => { reject(error) });
    })
  }

  signOut(auth: Auth): Promise<void> {
    return signOut(auth);
  }
  getAuth(): Auth {
    return getAuth();
  }

  getAllArticles(): Promise<ArticleElement[]> {
    return new Promise<ArticleElement[]>((resolve, reject) => {
      onValue(ref(this.database, `${this.baseEndpoint}/blogs`), (snapshot) => {
        const databaseVal = snapshot.val();

        let keys: string[] = []
        if (databaseVal) {
          keys = Object.keys(databaseVal);

          const b: ArticleElement[] = [];
          for (let i = 0; i < keys.length; i++) {
            const blog: ArticleElement = {
              index: i,
              key: keys[i],
              title: databaseVal[keys[i]].title,
              author: databaseVal[keys[i]].author,
              article: databaseVal[keys[i]].blog,
              dateCreated: databaseVal[keys[i]].dataCreated,
              dateUpdated: databaseVal[keys[i]].dataUpdated,
              tags: databaseVal[keys[i]].tags
            };

            b.push(blog);
          }

          resolve(b);
        } else {
          reject(Error('No records forund in blogs'));
        }
      }, (error) => {
        reject(error.message);
      });
    });
  }

  saveBlog(blog: ArticleDetails) {
    push(ref(this.database, `${this.baseEndpoint}/blogs`), blog);
  }

  updateBlog(blog: ArticleDetails, key: string) {
    update(ref(this.database, `${this.baseEndpoint}/blogs/${key}`), blog);
  }

  deleteBlog(key: string) {
    remove(ref(this.database, `${this.baseEndpoint}/blog/${key}`));
  }

  getHeader(): Promise<MyDetails> {
    return new Promise<MyDetails>((resolve, reject) => {
      onValue(ref(this.database, `${this.baseEndpoint}/header`), (snapshot) => resolve(snapshot.val()));
    });
  }

  saveExperience(experience: ExperienceDetails) {
    push(ref(this.database, `${this.baseEndpoint}/experiences`), experience);
  }

  updateExperience(experience: ExperienceDetails, key: string) {
    update(ref(this.database, `${this.baseEndpoint}/experiences/${key}`), experience);
  }

  saveProject(project: ProjectDetail) {
    push(ref(this.database, `${this.baseEndpoint}/projects`), project);
  }

  updateProject(project: ProjectDetail, key: string) {
    update(ref(this.database, `${this.baseEndpoint}/projects/${key}`), project);
  }

  updateProjectDescription(key: string, value: string) {
    set(ref(this.database, `${this.baseEndpoint}/projects/${key}` + '/projectDescription'), value);
  }

  deleteProject(key: string) {
    remove(ref(this.database, `${this.baseEndpoint}/projects/${key}`));
  }

  deleteExperience(key: string) {
    remove(ref(this.database, `${this.baseEndpoint}/experiences/${key}`));
  }

  getAllProjects(): Promise<ProjectElement[]> {
    return new Promise<ProjectElement[]>((resolve, reject) => {
      onValue(ref(this.database, `${this.baseEndpoint}/projects`), (snapshot) => {
        const databaseVal = snapshot.val();

        let keys: string[] = [];
        if (databaseVal) {
          keys = Object.keys(databaseVal);
        } else {
          reject(Error("No records in Projects"));
        }

        const p: ProjectElement[] = [];

        for (let i = 0; i < keys.length; i++) {
          const project: ProjectElement = {
            index: i,
            key: keys[i],
            projectName: databaseVal[keys[i]].projectName,
            url: databaseVal[keys[i]].url,
            contentUrl: databaseVal[keys[i]].contentUrl,
            type: databaseVal[keys[i]].type,
            projectDescription: databaseVal[keys[i]].projectDescription,
            projectStatus: databaseVal[keys[i]].projectStatus ? databaseVal[keys[i]].projectStatus : ''
          }

          p.push(
            project
          );
        }

        resolve(p);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAllExperiences(): Promise<ExperienceElement[]> {
    return new Promise<ExperienceElement[]>((resolve, reject) => {
      onValue(ref(this.database, `${this.baseEndpoint}/experiences`), (snapshot) => {
        const databaseVal = snapshot.val();

        let keys: string[] = [];
        if (databaseVal) {
          keys = Object.keys(databaseVal);
        } else {
          reject(Error("No records in Experiences"));
        }

        const e: ExperienceElement[] = [];

        for (let i = 0; i < keys.length; i++) {
          const experience: ExperienceElement = {
            index: i,
            key: keys[i],
            title: databaseVal[keys[i]].title,
            startDate: databaseVal[keys[i]].startDate,
            endDate: databaseVal[keys[i]].endDate,
            description: databaseVal[keys[i]].description,
            skills: databaseVal[keys[i]].skills,
            company: databaseVal[keys[i]].company,
            image: databaseVal[keys[i]].image,
            logoUrl: databaseVal[keys[i]].logoUrl
          }

          e.push(
            experience
          );
        }

        resolve(e);
      }, (error) => {
        reject(error.message);
      });
    });
  }

  getProjectById(id: any): Promise<ProjectElement> {
    return new Promise<ProjectElement>((resolve, reject) => {
      onValue(ref(this.database, `${this.baseEndpoint}/projects/` + id), (snapshot) => {
        resolve(snapshot.val());
      }, (error) => {
        reject(error.message);
      })
    })
  }

  getExperienceById(id: any): Promise<ExperienceElement> {
    return new Promise<ExperienceElement>((resolve, reject) => {
      onValue(ref(this.database, `${this.baseEndpoint}/experiences/` + id), (snapshot) => {
        resolve(snapshot.val());
      }, (error) => {
        reject(error.message);
      })
    })
  }

  getAchievements(): Promise<AchievementElement[]> {
    return new Promise<AchievementElement[]>((resolve, reject) => {
      onValue(ref(this.database, `${this.baseEndpoint}/achievements`), (snapshot) => {
        const databaseVal = snapshot.val();

        let keys: string[] = [];
        if (databaseVal) {
          keys = Object.keys(databaseVal);

          const a: AchievementElement[] = [];
          for (let i = 0; i < keys.length; i++) {
            const achievement: AchievementElement = {
              index: i,
              key: keys[i],
              name: databaseVal[keys[i]].name,
              description: databaseVal[keys[i]].description,
              dateCreated: databaseVal[keys[i]].dateCreated
            };

            a.push(achievement);
          }

          resolve(a);
        } else {
          reject(Error('Achievements not found!'));
        }
      }, (error) => {
        reject(error.message);
      });
    });
  }

  saveAchievement(achievement: AchievementDetails) {
    push(ref(this.database, `${this.baseEndpoint}/achievements`), achievement);
  }

  updateAchievement(achievement: AchievementDetails, key: string) {
    update(ref(this.database, `${this.baseEndpoint}/achievements/${key}`), achievement);
  }

  deleteAchievement(key: string) {
    remove(ref(this.database, `${this.baseEndpoint}/achievements/${key}`));
  }

  getCertificates() {
    return new Promise<CertificateElement[]>((resolve, reject) => {
      onValue(ref(this.database, `${this.baseEndpoint}/certificates`), (snapshot) => {
        const databaseVal = snapshot.val();

        let keys: string[] = [];
        if (databaseVal) {
          keys = Object.keys(databaseVal);

          const c: CertificateElement[] = [];
          for (let i = 0; i < keys.length; i++) {
            const achievement: CertificateElement = {
              index: i,
              key: keys[i],
              name: databaseVal[keys[i]].name,
              url: databaseVal[keys[i]].url,
              dateCreated: databaseVal[keys[i]].dateCreated
            };

            c.push(achievement);
          }

          resolve(c);
        } else {
          reject(Error('Certificates not found!'));
        }
      }, (error) => {
        reject(error.message);
      });
    });
  }

  deleteCertificate(key: string) {
    remove(ref(this.database, `${this.baseEndpoint}/certificates/${key}`));
  }

  updateCertificate(certificate: CertificateDetails, key: string) {
    update(ref(this.database, `${this.baseEndpoint}/certificates/${key}`), certificate);
  }

  saveCertificate(certificate: CertificateDetails) {
    push(ref(this.database, `${this.baseEndpoint}/certificates`), certificate);
  }

  retrieveContent(url: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const options: Object = {
        headers: new HttpHeaders({ 'Accept': 'text/plain' }),
        responseType: 'text'
      }

      this.http.get<string>(url, options)
        .subscribe(data => resolve(data))
    });
  }

  async getJournal() {

    return new Promise<JournalElement[]>((resolve, reject) => {
      this.authService.getUserId()
      .then(userId => {
        if (userId) {
          onValue(ref(this.database, `journal/${userId}`), (snapshot) => {
            const databaseVal = snapshot.val();

            let keys: string[] = [];
            if (databaseVal) {
              keys = Object.keys(databaseVal);

              const c: JournalElement[] = [];
              for (let i = 0; i < keys.length; i++) {
                const log: JournalElement = {
                  index: i,
                  key: keys[i],
                  title: databaseVal[keys[i]].title,
                  log: databaseVal[keys[i]].log,
                  tags: databaseVal[keys[i]].tags,
                  dateCreated: databaseVal[keys[i]].dateCreated,
                  dateUpdated: databaseVal[keys[i]].dateUpdated,
                  dateReminder: databaseVal[keys[i]].dateReminder
                }

                c.push(log);
              }

              resolve(c);
            } else {
              reject(Error('No Journal was found!'));
            }
          }, (error) => {
            reject(error);
          });
        }
      })
      .catch((error: Error) => reject(error));
    });
  }

  updateJournal(log: JournalDetails, key: string) {
    this.authService.getUserId()
      .then(userId => {
        update(ref(this.database, `journal/${userId}/${key}`), log);
      }, (error) => {
        console.error(error);
      });
  }

  saveJournal(log: JournalDetails) {
    this.authService.getUserId()
      .then(userId => {
        if (userId) {
          push(ref(this.database, `journal/${userId}`), log);
        }
      }, (error) => {
        console.error(error);
      });
  }
}
