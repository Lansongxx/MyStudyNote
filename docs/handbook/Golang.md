# Golang

## 1.chan中无缓冲和有缓冲的区别
<details>
  <summary>答案</summary>
  <p>无缓冲chan在写入和读出时都会立马阻塞</p>
  <p>有缓冲chan在缓冲区满时会写入阻塞，缓冲区为空时会读出阻塞</p>
</details>

## 2.chan的主要作用
<details>
  <summary>答案</summary>
  <p>不同goroutine之间进行通信</p>
</details>

## 3.go如何实现面向对象
<details>
  <summary>答案</summary>
  <p>面向对象包括三大特征，封装继承多态</p>
  <p>go的结构体可以对属性进行封装，并且结构体可以通过内嵌匿名类型实现继承，通过接口和方法可以实现多态</p>
</details>

## 4.make和new的区别
<details>
  <summary>答案</summary>
  <p>1.使用对象不同：new可以用于任何类型，make只能用于slice，map，chan</p>
  <p>2.返回值不同：new的返回值是指向该类型的指针，make返回的是原始类型</p>
  <p>3.用途不同：new主要用于分配内存，make主要用于初始化slice，map,chan</p>
</details>

## 5.go在main之前会执行什么函数吗
<details>
  <summary>答案</summary>
  <p>会执行init函数</p>
</details>

## 6.go有没有异常类型
<details>
  <summary>答案</summary>
  <p>go没有异常类型，只有错误类型error，一般用error表示异常</p>
</details>

## 7.GMP是什么
<details>
  <summary>答案</summary>
  <p>GMP是实现goroutine的调度模型，G表示一个goroutine，存储的goroutine的一些信息，M表示一个工作线程，P表示一个上下文信息，里面存储了本地的goroutine运行队列和内存资源，G需要在M上运行，M需要获取P才能运行</p>
</details>

## 8.GMP模型为什么要有P
<details>
  <summary>答案</summary>
  <p>如果只有GM会导致多个M竞争同一个全局队列，P的出现能够降低对全局队列的依赖，同时P能够使得G创建的子G在同一个M中运行，从而提高局部性，减少线程切换带来的额外开销</p>
</details>

## 9.go的竞态条件
<details>
  <summary>答案</summary>
  <p>两个以上的协程访问和操作同一共享数据从而产生随机的结果</p>
</details>

## 10.100个协程执行了50个，51panic后面的还执行吗 - 不想退出怎么做
<details>
  <summary>答案</summary>
  <p>后面的不会执行，如果不想退出需要在panic的协程处使用recover捕获错误</p>
</details>

## 11.map的访问是有序还是无序的
<details>
  <summary>答案</summary>
  <p>是无序的，因为它的代码中就是随机生成的起点，为了使得程序员不能依赖map的遍历顺序，这样设计的主要目的是因为map会动态扩容，key的位置可能发生改变，所以是无序的</p>
</details>

## 12.channel底层
<details>
  <summary>答案</summary>
  <p>channel本质上是一个环形数组，channel结构体包含了指向环形数组的指针，等待发送队列，等待接收队列，目前已接收的下标，目前已发送的下标，互斥锁，并且channel是线程安全的</p>
</details>

## 13.对已经关闭的channel进行操作会怎么样？
<details>
  <summary>答案</summary>
  <p>读已经关闭的channel能够正常读出，如果channel为空，会读到零值，写和关闭已经关闭的channel会导致panic</p>
</details>

## 14.go语言中的int和int32区别
<details>
  <summary>答案</summary>
  <p>int的数据范围根据操作系统而定，当为32位时数据范围和int32一样，当为64位时，数据范围和int64一样</p>
</details>

## 15.go map 并发安全吗？为什么
<details>
  <summary>答案</summary>
  <p>不安全，因为它内部维护了一个变量，如果多个协程同时访问或操作同一个map会导致panic().这样设计的原因是因为map不需要并发的场景更多，如果因为为了并发访问而加锁，会导致性能严重下降，如果需要并发安全可以使用sync.Map</p>
</details>

## 16.go中切片和数组的区别
<details>
  <summary>答案</summary>
  <p>1.长度：切片是不定长的，数组是定长的</p>
  <p>2.内部实现：数组是基于连续的内存空间的存储结构，而切片则是存储了底层数组的指针和容量和长度的结构体</p>
  <p>3.声明方式：数组声明时必须指定长度，而切片可以不指定长度</p>
</details>

## 17.切片扩容
<details>
  <summary>答案</summary>
  <p>当发生切片扩容时，首先判断新的容量是否超过旧容量的两倍，如果超过，则直接将切片容量赋值为新切片容量，否则判断旧切片容量是否超过256，如果不超过则直接赋值为旧切片容量的两倍，否则将切片容量增加到当前的1.25倍 再加上256的四分之三，直到超过新切片容量为止，然后再进行内存对齐</p>
</details>

## 18.Go的GC原理
<details>
  <summary>答案</summary>
  <p>go的gc采用的是三色标记法，分为白色，灰色，黑色三种。白色表示等待回收对象，灰色表示保留但未访问对象，黑色表示保留已访问对象</p>
  <p>一开始先STW，然后将所有对象染成白色，然后将根节点对象染成灰色，再从灰色集合中取出一个节点将其改为黑色，放入黑色集合，然后将其引用的节点改为灰色，放入灰色集合，直到灰色集合为空为止。然后结束STW，开始回收白色对象</p>
  <p>GC过程中需要STW，性能很低，但是如果并发GC的话，会导致引用对象丢失，一般会采用屏障机制来解决</p>
</details>

## 19.屏障机制

<details>
  <summary>答案</summary>
  <p>屏障机制分为插入写屏障机制，删除写屏障机制，混合屏障机制，其主要原理都是为了满足三色不变式，三色不变式有两种，强三色不变式和弱三色不变式，强三色不变式是指黑色对象不能引用白色对象，弱三色不变式是指黑色对象可以引用白色对象，但是白色对象必须存在其他灰色对象对它的引用</p>
  <p>插入写屏障就是当增加一个对象时，将当前新增对象染成灰色，满足强三色不变式。但是由于插入写屏障是针对堆上对象而言的，栈对象无写屏障，所以会导致可能存在黑色对象引用白色对象，所以扫描结束后必须STW重新扫描栈才能不丢失对象</p>
  <p>删除屏障机制就是在开始时STW，扫描所有根对象，使得根节点为黑色，根节点引用的对象都是灰色，满足弱三色不变式，然后结束STW。然后当一个灰色或白色对象删除引用的一个对象白色对象时，将被删除的对象改为灰色，以保持弱三色不变式</p>
  <p>混合写屏障是优先扫描栈，将栈上所有可达对象标记为黑色，不需要STW，扫描到某个栈的时候，需要暂停当前栈的工作，栈上新添加对象直接标记为黑色，被删除对象改为灰色，被添加对象改为灰色</p>
</details>

## 20.gc触发的时机
<details>
  <summary>答案</summary>
  <p>1.手动触发：通过调用runtime.GC()函数触发</p>
  <p>2.周期性触发：程序启动的时候会创建一个监控线程，当周期性的触发GC</p>
  <p>3.创建对象的时候触发：在创建对象的时候，会调用mallocgc函数，如果满足条件，会触发gc</p>  
</details>

## 21.slice在做函数参数是的修改和添加是怎么回事，会改变实参吗
<details>
  <summary>答案</summary>
  <p>slice在做函数参数的时候，是将slice的值复制了一遍，当修改slice的时候，因为修改了底层数组，所以原slice中的底层数组的值也会发生改变，但是当添加元素的时候，由于原slice的cap参数没有改变，所以虽然底层数组添加了元素，但是在原slice看不到</p>
</details>

## 22.go中有引用传递吗？为什么？
<details>
  <summary>答案</summary>
  <p>go中只有值传递，在函数的参数传递时，都是将值拷贝了一遍</p>
</details>


## 23.逃逸分析
<details>
  <summary>答案</summary>
  <p>在编译阶段，由编译器进行逃逸分析，进行逃逸分析检查，决定分配到栈上还是堆上。一般对于存在外部引用的指针，接口，大对象，闭包都会发生逃逸</p>
</details>

## 24.根对象包括什么？
<details>
  <summary>答案</summary>
  <p>全局变量，执行栈，寄存器，执行栈包括栈上变量和指向堆内存区的指针</p>
</details>

## 25.map底层
<details>
  <summary>答案</summary>
  <p>map的底层是一个hmap的结构体，其中包括指向旧的buckets的指针，指向当前的buckets的指针,B(buckets数组长度的对数),hash0(哈希参数),count(总元素数量),flag(是否有协程在操作map)等，buckets指向的是一个bmap数组,bmap的底层是一个tophash数组,key数组,value数组(长度为8)，填充字段和指向溢出桶的指针。bmap中k/v的排列是k1,k2...v1,v2排列的，这样可以减少需要填充的空间</p>
</details>

## 26.map的查找
<details>
<summary>答案</summary>
<p>首先根据key计算出对应的hash值，然后取出hash值的低B位，表示该key在bmap数组总的下标，定位到对应的bmap后，遍历bmap中的tophash数组，然后判断是否正在扩容，如果正在扩容则判断当前的bmap的元素是否已经搬迁完毕，如果没有，则遍历旧bucket中对应的bmap，然后取出hash值中的高8位作为tophash值，然后与tophash数组中的值进行比对，如果相同则根据当前tophash数组中的位置定位到key的位置，比较key是否相同，如果相同则返回对应的value值，如果没有找到会继续沿着溢出通查找，如果还未找到目标元素则返回空值</p>
</details>

## 27.map的遍历
<details>
<summary>答案</summary>
<p>首先随机生成一个初始的bmap下标，然后开始遍历bmap，如果正在扩容，则去遍历对应的旧bucket的bmap，因为该bmap会分配到两个新的bmap中，所以我们只用遍历该bmap中，分配到当前bmap的元素。然后依次遍历即可</p>
</details>

## 28.map插入元素
<details>
<summary>答案</summary>
<p>首先根据key定位到对应的bmap，然后遍历bmap中的tophash数组，记录第一个空闲位置，如果找到相同的key则直接更新对应的value值，如果没有找到则将其插入空闲位置，如果没有空闲位置则添加一个溢出桶，将其插入，添加溢出桶时需要判断是否需要扩容，如果需要扩容，则还需要重新定位插入位置</p>
</details>

## 29.gmp当一个g堵塞时，m、p会发生什么? g阻塞结束后会发生什么？
<details>
  <summary>答案</summary>
  <p>当一个g阻塞后，执行它的m也会阻塞，然后调度器会将m的p分离，如果此时存在空闲的m，则会将p绑定到空闲的m上，阻塞结束后与原来的m会寻找空闲的p，如果找到了，则将其绑定，继续执行原来的g。如果没找到空闲的p，则会将原来的g放入全局队列，然后将原来的m放入缓冲池睡眠</p>
</details>

## 30.当一个g阻塞太长时间会发生什么？
<details>
  <summary>答案</summary>
  <p>一个g能执行的时间片一般是10ms,如果超过这个时间m就会切换到下一个g执行，这个一般成为中断</p>
</details>

## 31.有缓冲channel 发送数据和接收数据的流程
<details>
  <summary>答案</summary>
  <p>发送数据：首先判断channel是否为nil，如果为nil，则根据block变量决定是否阻塞。否则加锁，然后判断channel是否关闭，如果已经关闭，则panic，然后会看等待接收队列是否有协程等待，如果有的将其从接收队列取出,直接复制给接收者，否则的话，如果缓冲区未满，则直接写入缓冲区，否则，先判断是否为阻塞发送，如果是，则阻塞，然后将协程放入等待发送队列。否则直接退出</p>
  <p>接收数据：首先判断channel是否为nil，如果为nil，则根据block变量决定是否阻塞。否则加锁，然后判断channel是否关闭，如果已经关闭，则panic，然后会看等待发送队列是否有协程等待，如果有的将其从发送队列取出,直接从发送者复制过来，否则的话，如果缓冲区不为空，则直接从缓冲区读出，否则，先判断是否为阻塞接收，如果是，则阻塞，然后将协程放入等待接收队列。否则直接退出</p>
</details>

## 32.对 nil chan 进行操作会发生什么?
<details>
<summary>答案</summary>
<p>向nil chan 读出和写入数据会永久阻塞，close nil chan 会直接panic</p>
</details>

## 33.context是什么
<details>
  <summary>答案</summary>
  <p>context是一种成为类似于上下文的东西,主要用于父子节点之间同步取消信息，是一种协程调度的方式，并且context是线程安全的</p>
</details>

## 34.开辟多个写协程向一个channel中写数据，是有序吗
<details>
  <summary>答案</summary>
  <p>不是有序的，因为多个协程竞争一个channel，顺序是随机的，可以通过加锁来保证有序性</p>
</details>

## 35.拷贝大切片一定比拷贝小切片代价大吗？
<details>
  <summary>答案</summary>
  <p>对于浅拷贝来说，就是直接结构体值的复制，对于大小切片的代价都是一致的</p>
  <p>对于深拷贝来说，会将底层数组的值全部拷贝，所以拷贝大切片代价比拷贝小切片代价大</p>
</details>

## 36.go哪些数据类型是线程安全的 ？
<details>
  <summary>答案</summary>
  <p>sync.Map,Once,WaitGroup,Pool，chan,读写锁,互斥锁</p>
</details>

## 37.map可寻址吗 ？  
<details>
    <summary>答案</summary>
    <p>map本身作为一个结构体是可以寻址的，但是map中的元素是不可寻址的，因为map中的元素的地址总是变化着的，所以不可寻址</p>
</details>

## 37.map的两种扩容方式 ？ 
<details>
    <summary>答案</summary>
    <p>map包括等量扩容和翻倍扩容，等量扩容是为了应对map中存在大量空的溢出桶，翻倍扩容是为了应对map中大量桶都已经装满的情况</p>
</details> 

## 38.Map 的扩容机制 ？
<details>
  <summary>答案</summary>
  <p>发生扩容的条件是如果有溢出，并且装载因子超过6.5或者溢出桶的数量超过桶的数量。装载因子是元素数量/桶的数量。第一种条件是为了应该大多数桶都装满了的情况，第二种是为了应该存在很多的空溢出桶的情况</p>
  <p>第一种采用翻倍扩容，第二种采用等量扩容。然后扩容并不是原子的，而是通过搬迁函数实现的，每次搬迁两个bucket，搬迁过程中，会将需要搬迁的bucket分裂成两个bucket，将里面的元素均分到两个bucket中</p>
</details>

## 39.sync.map底层结构
<details>
  <summary>答案</summary>
    <p>sync map的底层是一个只读的map和一个可读可写的map，访问只读的map不需要加锁，实现了读写分离，</p>
    <p>sync.Map包含read,dirty,misses,mu字段，read字段包括一个map和amend变量，amend变量表示dirty中是否存在read中不存在的元素，read表示一个只读的map，不需要加锁，dirty就是一个map,它是可读可写的，它的读写操作都要加锁，misses记录了在read中访问不到，去访问dirty的次数，如果该次数超过了dirty的长度时，会将会dirty赋值给read，此时read中被删除的key才真正被释放。mu表示互斥锁。</p>
    <p>在读取数据的时候，会先去read中读取，如果读到了则直接返回，否则去dirty中读，并增加misses。</p>
    <p>在写数据的时候，如果key还存在或只是被软删除，则只需要在read map上进行cas操作，实现无锁更新，因为存储的是指针，dirty map 也会同步更新。否则需要加锁插入dirty map，并增加misses，如果misses达到dirty map 的长度，则会将dirty map 和 read map进行轮换，并将dirty map 置空，并将其中软删除的值彻底删除</p>
    <p>在删除数据时，如果key在read map中，则进行软删除，否则直接去dirty map中彻底删除</p>
    <p>由此可见sync.Map适用于读多写少的场景，但是使用的时候需要注意，key被delete的时候并没有被释放，只有当misses到达dirty的长度时才会释放。</p>
</details>

## 40.向一个 nil 的切片中 append 数据可以吗
<details>
  <summary>答案</summary>
  <p>可以，因为在append内部，如果被append的切片是nil，那么它会将其初始化</p>
</details>

## 41.结构体中的tag 有什么作用
<details>
  <summary>答案</summary>
  <p>1.序列化和反序列化</p>
  <p>2.数据库orm映射,通过sql标签获取对应数据库中的值</p>
  <p>3.数据校验</p>
</details>

## 42.Go里面的结构体可以进行比较吗？
<details>
  <summary>答案</summary>
  <p>go中的结构体是否能比较取决于其属性中的是否都是可比较类型，如果包含map,chan,slice这些不可比较字段，那么结构体是不可比较的。但是我们也可以通过deepequal进行比较</p>
</details>

## 43.mutex是个悲观锁还是乐观锁，乐观锁和悲观锁的区别？
<details>
  <summary>答案</summary>
  <p>mutex是悲观锁
  <p>乐观锁在操作的时候，不会上锁，而是记录该数据的时间戳或版本号，在更新的时候判断版本号或时间戳是否发生改变，如果发生改变则放弃操作，否则执行操作
  <p>悲观锁在操作数据时直接上锁，直到操作结束才释放锁，上锁期间其他人不能修改数据</p>
</details>

## 44.go引用类型
<details>
  <summary>答案</summary>
  <p>引用类型是指一个变量和另一个变量地址完全一致</p>
  <p>某种程度上，引用类型包括map,slice,chan。但是本身，map,slice,chan都是结构体，但是由于go编译器在取地址时，取的时底层data数组的地址，所以在这个角度上，可以看作引用类型。但是slice比较特殊，因为append可能会导致发生改变，从而导致传递后的地址不一致</p>
</details>

## 45.新建一个协程会占用多少内存
<details>
  <summary>答案</summary>
  <p>一般为2kb左右</p>
</details>

## 46.golang中如何拼接字符串？哪种效率最高？
<details>
  <summary>答案</summary>
  <p>1.直接通过+拼接</p>
  <p>2.通过fmt.Sprintf拼接</p>
  <p>3.通过strings.Builder拼接，该方式效率最高</p>
  <p>4.strings.join拼接，它是基于strings.Builder实现的</p>
  <p>5.通过bytes.Buffer拼接</p>
</details>

## 47.只采用读写锁+map的形式有什么弊端？
<details>
  <summary>答案</summary>
  <p>在读操作远大于写操作的时候，读写锁应能优势并不明显，因为写操作会阻塞读操作，不如sync.Map更好</p>
</details>

## 48.map可以边遍历边删除吗？
<details>
  <summary>答案</summary>
  <p>对于不同协程，一个遍历一个删除肯定是会panic的，但是对于同一个协程是可以的，但是遍历可能会包含已删除的key，这取决于删除key的时间</p>
</details>

## 49.go的并发编程如何避免死锁？
<details>
  <summary>答案</summary>
  <p>1.尽可能的顺序加锁</p>
  <p>2.使用context控制超时时间，避免一直等待
  <p>3.使用死锁检测工具</p>
</details>

## 50.GMP中调度机制，有了解过hand off和work-stealing机制吗
<details>
  <summary>答案</summary>
  <p>hand off 机制就是指当某个M因为G系统调用时，会将M和P进行分离，如果此时存在空闲的M，则直接将P与空闲的M绑定，如果不存在空闲的M，则创建一个M，与其绑定。当G阻塞结束后，M会寻找原来那个P，如果该P已经和其他的M绑定了，就会寻找空闲的P，与其绑定，继续执行G，如果没有空闲的P，则将M放入缓冲池睡眠，将G放入全剧运行队列</p>
  <p>work-stealing机制就是M运行时，首先有61分之1的概率会从全局队列取，如果没取到，再从本地运行队列取，如果本地运行队列为空，则去全局运行队列取，如果全局运行队列为空，则会去偷取其他P本地运行队列中的G</p>
</details>

## 51.go数组底层实现 ？ 
<details>
  <summary>答案</summary>
  <p>一块固定大小的连续内存空间</p>
</details>

## 52.defer的执行流程
<details>
  <summary>答案</summary>
  <p>defer一般用于函数或方法的延迟执行，当其包含参数时，参数会被立马计算,对于链式调用会将除最后一个都执行掉，然后会以后进先出的顺序执行defer的函数</p>
</details>

## 53.goroutine 什么时候会被回收
<details>
  <summary>答案</summary>
  <p>1.正常退出</p>
  <p>2.panic</p>
  <p>3.通过context取消</p>
</details>

## 54.是否可以无限创建 goroutine
<details>
  <summary>答案</summary>
  <p>不能，无限创建协程会导致短时间内占据操作系统的资源，然后最终因为资源紧缺而被系统强制终止。所以我们需要控制协程的数量。我们可以通过有缓冲的chan或信号量来控制协程的数量</p>
</details>

## 55.什么情况会出现 goroutine 泄漏
<details>
  <summary>答案</summary>
  <p>协程泄露是指主协程已经退出，子协程还在运行</p>
  <p>可能出现的情况包括子协程死循环，channel阻塞，select所有case都阻塞。我们可以通过context来进行超时控制，执行超过一定时间自动取消，还可以通过pprof来检测协程泄露情况</p>
</details>

## 56.for range 中赋值的变量，这个变量指向的是真实的地址吗，还是临时变量
<details>
  <summary>答案</summary>
  <p>for range 本质上是在for range外面使用了一个变量保存了值，然后不断将值复制给这个变量，指向的地址都是相同的</p>
</details>

## 54.如果在for range里面有一个函数，这个函数需要传一个指针，这时候应该怎么写？
<details>
  <summary>答案</summary>
  <p>可以用过创建一个局部变量来传指针</p>
</details>

## 55.Context了解吗，介绍一下它接口里的几个方法
<details>
  <summary>答案</summary>
  <p>Context是一个接口，包含几个方法,Err,Deadline,Value,Done。Err用于返回错误，Deadline用于返回是否会被取消，以及自动取消时间。Value()获取key对应的value，Done用于返回一个只读的chan，用于判断context是否被取消</p>
  <p>valueCtx则是包含了父亲的context并存储了一个key和对应的value</p>
  <p>cancelCtx则是包含了父亲的context，并存储了儿子节点的信息，如果当前ctx被取消，也会将儿子节点一并取消</p>
  <p>timeCtx包含一个定时器和超时时间，还内嵌了一个cancelCtx继承了其方法，能够在超时后调用cancelCtx的方法将其取消</p> 
</details>

## 56.waitgroup 的底层原理是什么 ？ 
<details>
  <summary>答案</summary>
  <p>waitgroup的底层就是维护一个信号量和等待者的数量waiter和需要等待的数量counter。信号量负责唤醒线程和挂起协程。这里使用一个无锁优化，将waiter和counter合并在一个字段上，因为在修改waiter和counter的时候要保证并发安全，将其绑定在一起可以使用cas来避免加锁，提高效率</p>
</details>

## 57.goroutine并发控制怎么做 ？
<details>
  <summary>答案</summary>
  <p>1.可以通过全局变量来实现，子协程检查该变量的值来实现并发控制，但很难实现子协程之间的通信</p>
  <p>2.通过channel发送信号来控制</p>
  <p>3.通过context来实现</p>
</details>

## 58.go 同步原语
<details>
  <summary>答案</summary>
  <p>1.互斥锁</p>
  <p>2.读写锁</p>
  <p>3.WaitGroup</p>
  <p>4.Once</p>
  <p>5.Cond 用来协调想要访问共享资源的那些 goroutine，当共享资源的状态发生变化的时候，它可以用来通知被互斥锁阻塞的 goroutine</p>
</details>

## 59.select底层
<details>
  <summary>答案</summary>
  <p>1.首先根据select内部的语句进行优化，比如，没有case，没有default，只有一个case，都有不同的优化</p>
  <p>2.然后将不同的case封装成一个结构体scase</p>
  <p>3.然后生成一个随机的遍历顺序和按锁地址确定加锁顺序，以能够公平的访问每个chan,避免饥饿。按锁的地址来确定加锁顺序，以避免死锁的发生，然后按照生成的加锁顺序将所有的chan锁住</p>
  <p>4.根据生成的遍历顺序，遍历所有的case，查看是否有可以立刻处理的chan，如果有，直接获取对应的索引并返回,否则将当前协程封装成一个sudog，然后写入对应的等待发送队列或等待接收队列.然后将当前协程挂起</p>
  <p>5.协程被唤醒后，找到可以直接处理的case，返回对应的索引</p>
</details>

## 60.go CSP模型 
<details>
  <summary>答案</summary>
  <p>go的csp模型是通过goroutine和channel实现，goroutine负责实现并发执行，而channel实现goroutine之间的协调和通信</p>
</details>

## 61.go pool底层原理  
<details>
  <summary>答案</summary>
  <p>go pool 的底层是一个本地对象池和一个上一轮的本地对象池，它利用了GMP的特性，一个M绑定在一个P上，所以本地对象池的数量就是P的数量，这样可以减少并发的情况。然后记录上一轮的本地对象池，是一种牺牲者机制，因为每次gc前就会将本地对象池清空，但是如果直接清空，会导致内存波动比较大，所以需要有使用牺牲者机制来缓冲</p>
  <p>本地对象池是一个链表+环形数组的结构，而环形数组的首尾指针的存储，使用了无锁优化，因为如果不同的P同时修改head和tail会导致并发冲突，所以我们可以将其合并到一个字段上，然后使用cas来确保只会有一个修改成功</p>
  <p>当需要取对象时，首先需要调用pin函数，将当前的p锁定，以避免hand off机制将P与M分离，然后从本地对象池的私有对象中取，这样可以避免从共享对象池中取的繁琐操作。如果没有则去本地对象池中取，要从队头取，如果也没有，则去其他P的本地对象池中取，从队尾取，这样可以尽可能的减少并发冲突。如果还没有则去上一轮的本地对象池中取，如果还没有则New一个新的</p>
  <p>当需要放入对象时，首先需要调用pin函数，然后尝试放入私有对象，如果已经存在，则放入本地对象池中，如果链表头的环形数组已满，则创建一个长度为上一个环形数组大小两倍的数组，从队头写入</p>
</details>

## 62.interface  
<details>
  <summary>答案</summary>
  <p>接口分为iface和eface，eface是一个空接口，所有类型都实现了这个接口</p>
  <p>iface包括data和itab，data记录了接口值的地址，itab记录了接口的相关信息，itab包括interfacetype，_type,fun,_,hash。interfacetype记录了接口的类型信息，interfacetype包括_type，pkgpath，mhdr，_type记录了接口类型，pkgpath记录了接口的包路径，mhdr记录了接口方法对应的名字和类型，_type记录了接口值的类型信息，包括记录了该类型实例所占用的内存大小，该类型中指针数据的大小，类型的哈希值，反射相关等变量，fun是一个可变数组，记录了具体的类型实现接口方法的函数地址.判断某个类型是否实现了某个接口，因为go已经将方法排好了序，所以双指针即可</p>
  <p>eface包括data和type,data记录了接口值的地址，type记录了接口值的类型 </p>
</details>

## 63.反射原理以及那些场景会用到反射 ？
<details>
  <summary>答案</summary>
  <p>反射本质上是通过读取interface读取变量内部的值和类型，reflect包含两个类型type和value，type记录通过读取_type值来实现的，value则是结合了_type和data，本质上是通过将值的地址转为unsafe.Pointer然后转成空接口获取对应的信息</p>
  <p>反射一般用于数据库orm，访问结构体的内部字段，结构体tag的处理，自定义序列化和反序列化逻辑，动态方法的调用</p>
</details>

## 64.值接收者和指针接收者Answer：defer常用于成对的操作，比如文件打开后要关闭、锁的申请和释放、sync.WaitGroup跟踪的goroutine的计数器的释放等。为了确保资源被释放，可以结合defer一起使用，避免在代码的各种条件分支里去释放资源，容易遗漏和出错。有什么区别？
<details>
  <summary>答案</summary>
  <p>一般值接收者的方法不会改变接收者的属性 指针接收者的方法一般会改变接收者的属性或接收者比较大 无论你的接收者是指针还是值，都可以调用，因为编译器会自动帮你转成对应的接收者。但是当转为指针接收者时，必须满足结构者可寻址</p>
</details>

## 65.defer相比在函数的最后执行有什么优势
<details>
  <summary>答案</summary>
<p>避免代码逻辑混乱，防止遗漏</p>
</details>

## 66.GMP G的数量，M的数量，P的数量受到什么的限制?
<details>
<summary>答案</summary>
<p>G是协程，所以G的数量可能受到内存的限制，因为每个协程的数据结构都是要占用系统内存的，但是可以通过开启swap机制来解决</p>
<p>M的数量受到系语言设定(10000)，debug.SetMaxThreads限制</p>
<p>P的数量runtime.GOMAXPROCS限制</p>
</details>

## 67.如何控制协程的生命周期?
<details>
<summary>答案</summary>
<p>1.channel</p>
<p>2.context</p>
<p>3.waitgroup</p>
</details>