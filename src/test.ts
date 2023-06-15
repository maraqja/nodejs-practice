// // function Component(id: number) {
// // 	console.log('init')
// // 	return (target: Function) => {
// // 		console.log('run')
// // 		target.prototype.id = id
// // 	}
// // }

// // @Component(1)
// // export class User {
// // 	id: number

// // 	updateId(newId: number) {
// // 		this.id = newId
// // 		return this.id
// // 	}
// // }

// // console.log(new User().id)

// // REFLECT METADATA
// import 'reflect-metadata'

// function Injectable(key: string) {
// 	return (target: Function) => {
// 		Reflect.defineMetadata('a', 1, target)
// 		const meta = Reflect.getMetadata('a', target)
// 		console.log(meta)
// 	}

// }

// function Prop(target: Object, name: string) {

// }

// @Injectable('C')
// export class C {
// 	@Prop prop: number
// }

// @Injectable('D')
// export class D {
// 	constructor(@Inject('C') c:C) {}
// }
