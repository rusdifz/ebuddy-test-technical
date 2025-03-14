import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";
import { ReqGetUserListDTO } from "../dto/user.dto";

const usersCollection = db.collection("users");

class UserCollection {
  async getUserById(userId: string): Promise<User | null> {
    try {
      const doc = await usersCollection.doc(userId).get();

      return doc.exists ? ({ id: doc.id, ...doc.data() } as User) : null;
    } catch (error: any) {
      throw new Error(error.stack);
    }
  }

  async getUserByUsername(username): Promise<User | null> {
    try {
      const doc = await usersCollection.doc(username).get();

      return doc.exists ? ({ id: doc.id, ...doc.data() } as User) : null;
    } catch (error: any) {
      throw new Error(error.stack);
    }
  }

  async getUsers(
    props: ReqGetUserListDTO
  ): Promise<{ data: User[]; count: number }> {
    try {
      const initatiateQuery: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
        usersCollection;

      let query: any;

      if (props.sort) {
        query = initatiateQuery
          .orderBy(props.sort, props.order)
          .offset((props.page - 1) * props.limit)
          .limit(props.limit);
      } else {
        query = initatiateQuery
          .offset((props.page - 1) * props.limit)
          .limit(props.limit);
      }

      const [data, count] = await Promise.all([
        query.get(),
        initatiateQuery.count().get(),
      ]);

      // map data res
      const respData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      return {
        data: respData,
        count: count.data().count,
      };
    } catch (error: any) {
      throw new Error(error.stack);
    }
  }

  async updateUser(
    userId: string,
    data: Partial<User>
  ): Promise<Partial<User>> {
    try {
      await usersCollection.doc(userId).update(data);

      const user = this.getUserById(userId);

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createUser(data: Partial<User>) {
    const resp = await usersCollection.add(data);
    return { id: resp.id, ...data };
  }
}

export default new UserCollection();
